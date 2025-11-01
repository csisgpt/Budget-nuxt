import { defineEventHandler } from 'h3';
import { requireUserSession } from '../../utils/auth';
import { prisma } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event);
  const tenants = await prisma.organization.findMany({
    where: {
      memberships: { some: { userId: user.id } }
    },
    select: {
      id: true,
      name: true,
      slug: true,
      plan: true
    }
  });
  return { tenants };
});
