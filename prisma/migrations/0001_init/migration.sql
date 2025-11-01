-- Prisma migration for OrgaFlow initial schema
CREATE TYPE "Role" AS ENUM ('owner', 'admin', 'manager', 'member', 'viewer');
CREATE TYPE "SubscriptionPlan" AS ENUM ('free', 'pro', 'business');
CREATE TYPE "InvoiceStatus" AS ENUM ('draft', 'open', 'paid', 'void');
CREATE TYPE "NotificationChannel" AS ENUM ('email', 'push', 'realtime');

CREATE TABLE "User" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "totp_secret" TEXT
);

CREATE TABLE "Account" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "expiresAt" TIMESTAMP,
  UNIQUE("provider", "providerAccountId")
);

CREATE TABLE "Session" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "expires" TIMESTAMP NOT NULL,
  "sessionToken" TEXT NOT NULL UNIQUE
);

CREATE TABLE "Organization" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "plan" "SubscriptionPlan" NOT NULL DEFAULT 'free',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Membership" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "organizationId" UUID NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "role" "Role" NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "organizationId")
);

CREATE TABLE "Project" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT NOT NULL DEFAULT 'active',
  "organizationId" UUID NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "ownerId" UUID REFERENCES "User"("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Task" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'todo',
  "projectId" UUID NOT NULL REFERENCES "Project"("id") ON DELETE CASCADE,
  "organizationId" UUID NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "assigneeId" UUID REFERENCES "User"("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Comment" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "body" TEXT NOT NULL,
  "taskId" UUID NOT NULL REFERENCES "Task"("id") ON DELETE CASCADE,
  "authorId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "File" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "url" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "tenantId" UUID NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "userId" UUID REFERENCES "User"("id"),
  "projectId" UUID REFERENCES "Project"("id"),
  "taskId" UUID REFERENCES "Task"("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Notification" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "channel" "NotificationChannel" NOT NULL,
  "read" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "WebhookEndpoint" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organizationId" UUID NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "url" TEXT NOT NULL,
  "secret" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "WebhookLog" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "webhookId" UUID NOT NULL REFERENCES "WebhookEndpoint"("id") ON DELETE CASCADE,
  "status" TEXT NOT NULL,
  "response" TEXT,
  "attempts" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "AuditLog" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "actorId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "organizationId" UUID NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "action" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "ip" TEXT,
  "userAgent" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Subscription" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organizationId" UUID NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "plan" "SubscriptionPlan" NOT NULL,
  "status" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "stripeSubId" TEXT,
  "currentPeriodEnd" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Invoice" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "organizationId" UUID NOT NULL REFERENCES "Organization"("id") ON DELETE CASCADE,
  "subscriptionId" UUID REFERENCES "Subscription"("id"),
  "stripeInvoiceId" TEXT,
  "total" INTEGER NOT NULL,
  "status" "InvoiceStatus" NOT NULL DEFAULT 'draft',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "ApiToken" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "lastUsedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "FeatureFlag" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "key" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "enabled" BOOLEAN NOT NULL DEFAULT FALSE,
  "rollout" TEXT NOT NULL DEFAULT '100%',
  "organizationId" UUID REFERENCES "Organization"("id") ON DELETE SET NULL
);

CREATE TABLE "Preference" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL UNIQUE REFERENCES "User"("id") ON DELETE CASCADE,
  "locale" TEXT NOT NULL DEFAULT 'fa-IR',
  "theme" TEXT NOT NULL DEFAULT 'light',
  "notifications" JSONB NOT NULL DEFAULT '{"email":true,"push":false,"realtime":true}'::jsonb
);

CREATE TABLE "PasswordResetToken" (
  "token" UUID PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "expiresAt" TIMESTAMP NOT NULL
);

CREATE TABLE "QueueMetric" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "queue" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "ContentCache" (
  "key" TEXT PRIMARY KEY,
  "value" JSONB NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
