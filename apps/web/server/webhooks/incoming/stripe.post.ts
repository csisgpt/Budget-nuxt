import { createError, defineEventHandler, readRawBody } from 'h3';
import Stripe from 'stripe';
import { prisma } from '../../utils/db';
import { enqueueWebhookJob } from '../../jobs/queues';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });

export default defineEventHandler(async (event) => {
  const signature = event.node.req.headers['stripe-signature'];
  if (!signature) {
    throw createError({ statusCode: 400, statusMessage: 'Missing signature' });
  }
  const payload = await readRawBody(event);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  let parsed: Stripe.Event;
  try {
    parsed = stripe.webhooks.constructEvent(payload || '', signature, webhookSecret);
  } catch (error) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid signature' });
  }
  if (parsed.type === 'invoice.payment_succeeded') {
    const invoice = parsed.data.object as Stripe.Invoice;
    if (invoice.subscription && invoice.customer_email) {
      await prisma.invoice.create({
        data: {
          organizationId: invoice.metadata?.organizationId || '',
          total: invoice.amount_paid ?? 0,
          status: 'paid'
        }
      });
      await enqueueWebhookJob({
        url: 'https://example.com/webhooks/stripe',
        payload: invoice,
        signature: signature as string
      });
    }
  }
  return { received: true };
});
