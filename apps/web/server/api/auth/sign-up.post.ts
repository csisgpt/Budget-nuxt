import { createError, defineEventHandler, readBody } from 'h3';
import { z } from 'zod';
import { prisma } from '../../utils/db';
import { hashPassword, setSessionCookie } from '../../utils/auth';

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  organization: z.string().min(2),
  password: z.string().min(8)
});

export default defineEventHandler(async (event) => {
  const body = schema.parse(await readBody(event));

  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered' });
  }

  const passwordHash = await hashPassword(body.password);
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      passwordHash,
      memberships: {
        create: {
          role: 'owner',
          organization: {
            create: {
              name: body.organization,
              slug: body.organization.toLowerCase().replace(/\s+/g, '-')
            }
          }
        }
      }
    },
    include: { memberships: true }
  });

  await setSessionCookie(event, { sub: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.memberships.map((m) => m.role),
      tenantIds: user.memberships.map((m) => m.organizationId)
    }
  };
});
