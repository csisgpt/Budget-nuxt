import { createError, defineEventHandler } from 'h3';
import { prisma } from '../../utils/db';
import { requireUserSession } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event);
  const hasAdminRole = user.memberships.some((m) => ['admin', 'owner'].includes(m.role));
  if (!hasAdminRole) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }
  const flags = await prisma.featureFlag.findMany();
  return flags.map((flag) => ({
    key: flag.key,
    name: flag.name,
    description: flag.description,
    enabled: flag.enabled,
    rollout: flag.rollout
  }));
});
