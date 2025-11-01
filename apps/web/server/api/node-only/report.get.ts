import { defineEventHandler } from 'h3';
import { prisma } from '../../utils/db';

export default defineEventHandler(async () => {
  const [projects, tasks] = await Promise.all([
    prisma.project.count(),
    prisma.task.count()
  ]);
  return {
    projects,
    tasks,
    generatedAt: new Date().toISOString()
  };
});
