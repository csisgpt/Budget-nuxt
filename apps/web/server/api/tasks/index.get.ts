import { defineEventHandler, getQuery } from 'h3';
import { z } from 'zod';
import { prisma } from '../../utils/db';
import { requireUserSession } from '../../utils/auth';

const querySchema = z.object({ tenantId: z.string().uuid().optional() });

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event);
  const query = querySchema.parse(getQuery(event));
  const tenantIds = user.memberships.map((m) => m.organizationId);
  const items = await prisma.task.findMany({
    where: { organizationId: query.tenantId ?? { in: tenantIds } },
    include: { project: true },
    orderBy: { updatedAt: 'desc' }
  });
  return {
    items: items.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      project: { id: task.projectId, name: task.project?.name ?? '' }
    }))
  };
});
