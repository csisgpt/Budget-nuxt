import { defineEventHandler, readBody } from 'h3';
import { z } from 'zod';
import { prisma } from '../../utils/db';
import { enqueueEmailJob } from '../../jobs/queues';

const schema = z.object({ email: z.string().email() });

export default defineEventHandler(async (event) => {
  const { email } = schema.parse(await readBody(event));
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { success: true };
  const token = crypto.randomUUID();
  await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt: new Date(Date.now() + 60 * 60 * 1000) } });
  await enqueueEmailJob({
    to: email,
    subject: 'بازیابی رمز عبور OrgaFlow',
    template: 'reset-password',
    payload: { token }
  });
  return { success: true };
});
