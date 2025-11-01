import crypto from 'node:crypto';
import { prisma } from '../../utils/db';
import { enqueueWebhookJob } from '../../jobs/queues';

export const dispatchOrganizationWebhook = async (organizationId: string, event: string, payload: Record<string, unknown>) => {
  const endpoints = await prisma.webhookEndpoint.findMany({ where: { organizationId } });
  for (const endpoint of endpoints) {
    const signature = crypto.createHmac('sha256', endpoint.secret).update(JSON.stringify(payload)).digest('hex');
    await enqueueWebhookJob({ url: endpoint.url, payload: { event, data: payload }, signature });
  }
};
