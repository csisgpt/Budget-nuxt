import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  await prisma.featureFlag.createMany({
    data: [
      { key: 'realtimeNotifications', name: 'Realtime notifications', description: 'Enable socket.io delivery', enabled: true },
      { key: 'betaTasks', name: 'Task v2', description: 'New task experience', enabled: false }
    ],
    skipDuplicates: true
  });

  const adminPassword = await argon2.hash('Admin!234');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'سوپر ادمین',
      passwordHash: adminPassword
    }
  });

  const org = await prisma.organization.upsert({
    where: { slug: 'demo-org' },
    update: {},
    create: {
      name: 'Demo Org',
      slug: 'demo-org',
      plan: 'pro'
    }
  });

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: admin.id, organizationId: org.id } },
    update: { role: 'owner' },
    create: { userId: admin.id, organizationId: org.id, role: 'owner' }
  });

  const project = await prisma.project.create({
    data: {
      name: 'راه‌اندازی زیرساخت',
      description: 'راه‌اندازی سوشیال لاگین و Stripe',
      organizationId: org.id,
      ownerId: admin.id
    }
  });

  const task = await prisma.task.create({
    data: {
      title: 'پیکربندی Stripe',
      description: 'ایجاد محصولات و پلن‌ها در حالت تست',
      projectId: project.id,
      organizationId: org.id,
      assigneeId: admin.id,
      status: 'in-progress'
    }
  });

  await prisma.comment.create({
    data: {
      body: 'فرآیند تست پرداخت کامل شد.',
      taskId: task.id,
      authorId: admin.id
    }
  });

  await prisma.notification.create({
    data: {
      userId: admin.id,
      title: 'اشتراک جدید',
      body: 'سازمان Nova Labs پلن Pro را فعال کرد',
      channel: 'realtime'
    }
  });

  await prisma.subscription.create({
    data: {
      organizationId: org.id,
      plan: 'pro',
      status: 'active',
      amount: 4500
    }
  });

  await prisma.invoice.create({
    data: {
      organizationId: org.id,
      total: 4500,
      status: 'paid'
    }
  });

  await prisma.queueMetric.createMany({
    data: [
      { queue: 'emails', status: 'pending', count: 2 },
      { queue: 'webhooks', status: 'pending', count: 1 }
    ],
    skipDuplicates: true
  });

  console.log('Seed data inserted.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
