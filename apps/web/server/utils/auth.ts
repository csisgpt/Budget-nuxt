import type { H3Event } from 'h3';
import { createError, getCookie, setCookie } from 'h3';
import { SignJWT, jwtVerify } from 'jose';
import argon2 from 'argon2';
import { z } from 'zod';
import { useRuntimeConfig } from '#imports';
import { prisma } from './db';

const sessionCookie = 'orgaflow_session';

export const hashPassword = async (password: string) => argon2.hash(password);
export const verifyPassword = async (hash: string, password: string) => argon2.verify(hash, password);

const sessionSchema = z.object({ sub: z.string().uuid(), email: z.string().email() });

export const setSessionCookie = async (event: H3Event, payload: { sub: string; email: string }) => {
  const secret = useRuntimeConfig().sessionSecret;
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(secret));
  setCookie(event, sessionCookie, token, { httpOnly: true, sameSite: 'lax', secure: true, path: '/' });
};

export const clearSessionCookie = (event: H3Event) => {
  setCookie(event, sessionCookie, '', { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 0, path: '/' });
};

export const requireUserSession = async (event: H3Event) => {
  const token = getCookie(event, sessionCookie);
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  const secret = useRuntimeConfig().sessionSecret;
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  const result = sessionSchema.safeParse(payload);
  if (!result.success) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid session' });
  }
  const user = await prisma.user.findUnique({ where: { id: result.data.sub }, include: { memberships: true } });
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unknown user' });
  }
  event.context.user = user;
  return user;
};
