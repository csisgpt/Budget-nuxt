import { defineEventHandler, getQuery } from 'h3';
import { z } from 'zod';
import { prisma } from '../../utils/db';
import { requireUserSession } from '../../utils/auth';

const querySchema = z.object({
  tenantId: z.string().uuid().optional()
});

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event);
  const query = querySchema.parse(getQuery(event));
  const tenantIds = user.memberships.map((m) => m.organizationId);
  const items = await prisma.project.findMany({
    where: {
      organizationId: query.tenantId ?? { in: tenantIds }
    },
    select: {
      id: true,
      name: true,
      status: true,
      updatedAt: true,
      owner: { select: { name: true } }
    }
  });
  return {
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      status: item.status,
      owner: item.owner?.name ?? 'نامشخص',
      updatedAt: item.updatedAt.toISOString()
    }))
  };
});
