import { Queue } from 'bullmq';

const connection = { connection: { url: process.env.BULL_REDIS_URL || process.env.REDIS_URL || 'redis://localhost:6379' } };

export interface EmailJobData {
  to: string;
  subject: string;
  template: string;
  payload: Record<string, unknown>;
}

export const emailQueue = new Queue<EmailJobData>('emails', connection);
export const webhookQueue = new Queue('webhooks', connection);
export const importQueue = new Queue('imports', connection);

export const enqueueEmailJob = (data: EmailJobData) => emailQueue.add('send-email', data);
export const enqueueWebhookJob = (data: Record<string, unknown>) => webhookQueue.add('deliver', data, { attempts: 5 });
