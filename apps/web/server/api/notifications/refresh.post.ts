import { defineEventHandler } from 'h3';
import { requireUserSession } from '../../utils/auth';
import { prisma } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event);
  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 20
  });
  return {
    notifications: notifications.map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body,
      read: n.read,
      channel: n.channel,
      createdAt: n.createdAt
    }))
  };
});
