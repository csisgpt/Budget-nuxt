import { Worker } from 'bullmq';
import nodemailer from 'nodemailer';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const connection = { connection: { url: process.env.BULL_REDIS_URL || process.env.REDIS_URL || 'redis://localhost:6379' } };

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 1025),
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined
});

export const emailWorker = new Worker(
  'emails',
  async (job) => {
    const templatePath = path.resolve(`./emails/${job.data.template}.html`);
    let html = '';
    try {
      html = await readFile(templatePath, 'utf8');
      Object.entries(job.data.payload || {}).forEach(([key, value]) => {
        html = html.replaceAll(`{{${key}}}`, String(value));
      });
    } catch (error) {
      html = `<p>${job.data.subject}</p>`;
    }
    await transporter.sendMail({
      to: job.data.to,
      from: 'noreply@orgaflow.dev',
      subject: job.data.subject,
      html
    });
  },
  connection
);

export const webhookWorker = new Worker(
  'webhooks',
  async (job) => {
    const response = await fetch(job.data.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OrgaFlow-Signature': job.data.signature
      },
      body: JSON.stringify(job.data.payload)
    });
    if (!response.ok) {
      throw new Error(`Webhook delivery failed with status ${response.status}`);
    }
  },
  connection
);
