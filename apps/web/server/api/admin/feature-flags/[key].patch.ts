import { createError, defineEventHandler, getRouterParam } from 'h3';
import { prisma } from '../../../utils/db';
import { requireUserSession } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event);
  const hasAdminRole = user.memberships.some((m) => ['admin', 'owner'].includes(m.role));
  if (!hasAdminRole) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }
  const key = getRouterParam(event, 'key');
  if (!key) {
    throw createError({ statusCode: 400, statusMessage: 'Key required' });
  }
  const current = await prisma.featureFlag.findUnique({ where: { key } });
  if (!current) {
    throw createError({ statusCode: 404, statusMessage: 'Flag not found' });
  }
  await prisma.featureFlag.update({ where: { key }, data: { enabled: !current.enabled } });
  return { success: true };
});
