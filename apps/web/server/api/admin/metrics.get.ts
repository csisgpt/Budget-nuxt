import { createError, defineEventHandler } from 'h3';
import { requireUserSession } from '../../utils/auth';
import { prisma } from '../../utils/db';

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event);
  const hasAdminRole = user.memberships.some((m) => ['admin', 'owner'].includes(m.role));
  if (!hasAdminRole) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }
  const [userCount, orgCount, mrr, pendingJobs] = await Promise.all([
    prisma.user.count(),
    prisma.organization.count(),
    prisma.invoice.aggregate({ _sum: { total: true }, where: { status: 'paid' } }),
    prisma.queueMetric.findMany({ where: { status: 'pending' } })
  ]);
  const subscriptionReport = await prisma.subscription.groupBy({
    by: ['plan'],
    _count: true,
    _sum: { amount: true }
  });
  return {
    metrics: {
      activeUsers: userCount,
      organizations: orgCount,
      mrr: mrr._sum.total ?? 0,
      pendingJobs: pendingJobs.length
    },
    subscriptionReport: subscriptionReport.map((row) => ({
      name: row.plan,
      accounts: row._count,
      mrr: row._sum.amount ?? 0,
      updatedAt: new Date().toISOString()
    }))
  };
});
