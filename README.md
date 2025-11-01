# OrgaFlow Monorepo

OrgaFlow یک نمونه‌ی کامل SaaS چندمستاجری بر پایه Nuxt 3 است که بیشتر قابلیت‌های هسته‌ای Nuxt و اکوسیستم پیرامون آن را در قالب سناریوهای واقعی پیاده‌سازی می‌کند. این مخزن شامل اپلیکیشن Nuxt، کتابخانه UI مشترک، کانفیگ‌های سراسری و زیرساخت توسعه است.

## فهرست مطالب
- [ویژگی‌ها](#ویژگیها)
- [پیش‌نیازها](#پیشنیازها)
- [راه‌اندازی سریع](#راهاندازی-سریع)
- [اسکریپت‌های PNPM](#اسکریپتهای-pnpm)
- [متغیرهای محیطی](#متغیرهای-محیطی)
- [سرویس‌های داکر](#سرویسهای-داکر)
- [ساختار پوشه‌ها](#ساختار-پوشهها)
- [تست قابلیت‌های Nuxt](#تست-قابلیتهای-nuxt)
- [Storybook](#storybook)
- [OpenAPI و Swagger](#openapi-و-swagger)
- [نظارت و لاگ](#نظارت-و-لاگ)

## ویژگی‌ها
- Nuxt 3 (SSR/CSR/SSG/ISR) + Vite و ماژول محلی `orga-module`
- TypeScript strict در سراسر کد
- Tailwind CSS 4.1 با پشتیبانی RTL و تم روشن/تاریک با CSS Variable
- Pinia با Persisted State، ترکیبات اختصاصی و VueUse
- i18n با fa-IR (پیش‌فرض) و en-US، تغییر جهت پویا و middleware محلی
- @nuxt/content برای وبلاگ و مستندات همراه با ISR و کدهای هایلایت شده
- ماژول PWA با manifest، Workbox، حالت آفلاین و Web Push نمونه
- Prisma + PostgreSQL، Redis، MinIO، MailHog، Stripe، BullMQ، Socket.io
- API تایپ شده با Zod، محافظت CSRF، Rate-limit، CORS و Swagger UI
- ارسال/دریافت وب‌هوک با امضا، صف‌های پس‌زمینه، اعلان‌های لحظه‌ای
- داشبورد چندمستاجری با AG Grid، آپلود فایل، حضور آنلاین و مرکز اعلان
- Admin panel برای مدیریت کاربران، Feature flag و شاخص‌های تجاری
- تست‌ها با Vitest، Playwright، Storybook 8، CI/CD با GitHub Actions
- Docker/Docker Compose برای سرویس‌های محلی و Dockerfile تولیدی

## پیش‌نیازها
- Node.js 20 یا 22 (LTS)
- pnpm 8
- Docker و Docker Compose برای سرویس‌های وابسته

## راه‌اندازی سریع
```bash
pnpm install
cp .env.example .env
pnpm docker:up                # اجرای PostgreSQL، Redis، MinIO، MailHog، Meilisearch
pnpm db:migrate
pnpm db:seed                  # ایجاد کاربر admin@example.com با گذرواژه Admin!234
pnpm dev                      # اجرای Nuxt روی http://localhost:3000
```
سرویس‌های توسعه:
- اپلیکیشن: http://localhost:3000
- Swagger UI: http://localhost:3000/api/docs
- MailHog: http://localhost:8025
- MinIO Console: http://localhost:9001 (کاربر/رمز `minioadmin`)
- Meilisearch: http://localhost:7700

برای توقف سرویس‌های داکر:
```bash
pnpm docker:down
```

## اسکریپت‌های PNPM
| فرمان | توضیح |
| --- | --- |
| `pnpm dev` | اجرای Nuxt با HMR |
| `pnpm build` | ساخت خروجی تولیدی در `.output/` |
| `pnpm preview` | اجرای خروجی تولیدی |
| `pnpm typecheck` | بررسی TypeScript |
| `pnpm lint` / `pnpm lint:fix` | ESLint/Stylelint |
| `pnpm format` | Prettier با Tailwind plugin |
| `pnpm test:unit` | Vitest |
| `pnpm coverage` | Vitest با پوشش |
| `pnpm test:e2e` | Playwright (با سرور محلی) |
| `pnpm db:migrate` | اجرای مایگریشن‌های Prisma |
| `pnpm db:generate` | تولید Prisma Client |
| `pnpm db:seed` | داده نمونه (کاربر ادمین، سازمان و پروژه) |
| `pnpm db:reset` | ریست کامل پایگاه داده |
| `pnpm openapi:gen` | تولید `public/openapi.json` از اسکریپت OpenAPI |
| `pnpm docker:up` / `pnpm docker:down` / `pnpm docker:logs` | مدیریت سرویس‌های توسعه |
| `pnpm story` / `pnpm story:build` | Storybook dev/build |

## متغیرهای محیطی
فایل [.env.example](./.env.example) شامل همه‌ی متغیرها با مقدار پیش‌فرض ایمن است. مهم‌ترین کلیدها:
- `DATABASE_URL`، `REDIS_URL`، `MINIO_*`، `SMTP_*`
- `SESSION_SECRET` و `JWT_SECRET`
- `STRIPE_SECRET_KEY` و `STRIPE_WEBHOOK_SECRET`
- `SOCKET_URL` برای Socket.io
- `NUXT_PUBLIC_SITE_URL` برای SEO و sitemap

## سرویس‌های داکر
تعریف در [infrastructure/docker/docker-compose.dev.yml](./infrastructure/docker/docker-compose.dev.yml):
- PostgreSQL 15
- Redis 7
- MinIO (ذخیره‌سازی S3 compatible)
- MailHog
- Meilisearch (برای جستجوی محتوا)

## ساختار پوشه‌ها
```
apps/
  web/                # اپلیکیشن Nuxt 3
    app/              # ورودی Nuxt و Layout اصلی
    assets/           # CSS و فونت‌ها
    components/       # مولفه‌های UI (Marketing, Dashboard, System)
    composables/      # useAuth/useTenant/useRealtime/...
    content/          # Markdown وبلاگ و مستندات
    layouts/          # public, dashboard, admin, auth
    middleware/       # auth.global, locale.global, rbac
    modules/          # ماژول محلی orga-module
    pages/            # صفحات بازاریابی، داشبورد، ادمین، احراز هویت
    plugins/          # dayjs، api fetch، pinia persisted، socket
    public/           # آیکون‌ها، manifest، OpenAPI
    server/           # API، middleware، jobs، realtime، webhooks
    stores/           # Pinia stores
    tests/            # Vitest و Playwright
    stories/          # Storybook stories
packages/
  ui/                 # کتابخانه UI مشترک + Storybook
  config/             # ESLint/Stylelint/TS configs
prisma/               # schema.prisma + migration + seed
scripts/              # Seed و تولید OpenAPI
infrastructure/       # docker-compose
```

## تست قابلیت‌های Nuxt
| قابلیت | روش بررسی |
| --- | --- |
| SSR داشبورد | باز کردن `/dashboard` (نیاز به ورود: admin@example.com / Admin!234) |
| SSG فرود | اجرای `nuxt build && nuxt preview` و بازدید `/` |
| ISR وبلاگ | صفحه `/blog` با `routeRules` (swr: 60) |
| CSR Widget | صفحه داشبورد شامل `<client-only>` نمودار بلادرنگ |
| Edge API | فراخوانی `GET /api/edge/health` |
| Node-only API | فراخوانی `GET /api/node-only/report` |
| cachedEventHandler | `GET /api/stats` با کش ۶۰ ثانیه |
| وب‌هوک Stripe | ارسال درخواست POST با هدر `stripe-signature` به `/server/webhooks/incoming/stripe` |
| Socket.io | صفحه داشبورد → بخش حضور آنلاین (🟢) و اعلان‌های بلادرنگ |
| صف BullMQ | کدهای `server/jobs/queues.ts` و `workers.ts` + اجرای seed |
| Storage MinIO | آپلود از `/api/files/upload` (با توکن جلسه) |
| i18n و جهت | کلید زبان در هدر (LocaleSwitcher) |
| PWA | اجرای `pnpm build && pnpm preview` سپس DevTools > Application |
| SEO | تابع `useSeoDefaults` در صفحات و sitemap خودکار |
| @nuxt/content | صفحات `/blog/*` و `/docs/*` |
| AG Grid | داشبورد → `/dashboard/projects` |
| فرم Zod | صفحات احراز هویت با `useForm` |
| Feature Flags | Admin → `/admin/feature-flags` |

## Storybook
کتابخانه UI در `packages/ui` دارای Storybook 8 است.
```bash
pnpm story           # اجرا روی http://localhost:6006
pnpm story:build     # ساخت استاتیک
```

## OpenAPI و Swagger
اسکریپت [scripts/generate-openapi.ts](./scripts/generate-openapi.ts) فایل `apps/web/public/openapi.json` را ایجاد می‌کند. Swagger UI در مسیر `/api/docs` ارائه می‌شود.

## نظارت و لاگ
- Pino برای لاگ ساختاری (`server/plugins/logger.ts`)
- Sentry (dsn از محیط) برای خطا و Trace
- Nitro route rules برای هدرهای امنیتی و کش
- QueueMetrics + صف‌های BullMQ برای نظارت بر پردازش پس‌زمینه

موفق باشید و از OrgaFlow لذت ببرید! 🎉
