import { createError, defineEventHandler, getRouterParam } from 'h3';
import { z } from 'zod';
import { prisma } from '../../utils/db';
import { requireUserSession } from '../../utils/auth';

const paramSchema = z.object({ id: z.string().uuid() });

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const params = paramSchema.parse({ id: getRouterParam(event, 'id') });
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { owner: true }
  });
  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' });
  }
  return {
    id: project.id,
    name: project.name,
    status: project.status,
    owner: project.owner?.name,
    updatedAt: project.updatedAt
  };
});
