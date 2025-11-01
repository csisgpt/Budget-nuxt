import { cachedEventHandler } from 'nitropack';
import { prisma } from '../utils/db';

export default cachedEventHandler(async () => {
  const [projects, tasks] = await Promise.all([prisma.project.count(), prisma.task.count()]);
  return {
    projects,
    tasks,
    refreshedAt: new Date().toISOString()
  };
}, { maxAge: 60 });
