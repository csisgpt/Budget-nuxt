import { createError, defineEventHandler, getRouterParam } from 'h3';
import { z } from 'zod';
import { prisma } from '../../utils/db';
import { requireUserSession } from '../../utils/auth';

const paramSchema = z.object({ id: z.string().uuid() });

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const params = paramSchema.parse({ id: getRouterParam(event, 'id') });
  const task = await prisma.task.findUnique({
    where: { id: params.id },
    include: { project: true }
  });
  if (!task) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' });
  }
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    project: { id: task.projectId, name: task.project?.name },
    updatedAt: task.updatedAt
  };
});
