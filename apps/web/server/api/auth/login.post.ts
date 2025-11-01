import { createError, defineEventHandler, readBody } from 'h3';
import { z } from 'zod';
import { prisma } from '../../utils/db';
import { setSessionCookie, verifyPassword } from '../../utils/auth';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  totp: z.string().optional()
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parse = bodySchema.safeParse(body);
  if (!parse.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload', data: parse.error.flatten() });
  }
  const user = await prisma.user.findUnique({ where: { email: parse.data.email }, include: { memberships: true } });
  if (!user || !(await verifyPassword(user.passwordHash, parse.data.password))) {
    throw createError({ statusCode: 401, statusMessage: 'Credentials invalid' });
  }
  await setSessionCookie(event, { sub: user.id, email: user.email });
  return {
    token: 'session-cookie',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.memberships.map((m) => m.role),
      tenantIds: user.memberships.map((m) => m.organizationId),
      twoFactorEnabled: user.totpSecret !== null
    }
  };
});
