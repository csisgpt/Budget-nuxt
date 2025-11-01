import { createError, defineEventHandler, readBody } from 'h3';
import { z } from 'zod';
import { prisma } from '../../utils/db';
import { hashPassword } from '../../utils/auth';

const schema = z.object({ token: z.string().uuid(), password: z.string().min(8) });

export default defineEventHandler(async (event) => {
  const { token, password } = schema.parse(await readBody(event));
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.expiresAt < new Date()) {
    throw createError({ statusCode: 400, statusMessage: 'Token invalid' });
  }
  await prisma.user.update({ where: { id: record.userId }, data: { passwordHash: await hashPassword(password) } });
  await prisma.passwordResetToken.delete({ where: { token } });
  return { success: true };
});
