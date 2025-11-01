---
title: "نقشه قابلیت‌های Nuxt"
description: "آدرس هر قابلیت در پروژه"
---

| قابلیت | محل پیاده‌سازی |
| --- | --- |
| SSR داشبورد | `pages/dashboard/**` با `definePageMeta` |
| SSG بازاریابی | `pages/index.vue` و `nuxt.config.ts` routeRules |
| ISR وبلاگ | `nuxt.config.ts` مسیر `/blog/**` |
| API تایپ شده | `server/api/**/*.ts` با Zod |
| Socket.io | `server/realtime/socket.ts` و `composables/useRealtime.ts` |
| صف‌ها | `server/jobs/queues.ts` و `server/jobs/workers.ts` |
| وب‌هوک | `server/webhooks/stripe.ts` و `server/webhooks/inbound.ts` |
| OpenAPI | `scripts/generate-openapi.ts` و `/api/docs` |
| ماژول محلی | `modules/orga-module` |
| Edge Route | `server/api/edge/health.get.ts` |
| Node-only Route | `server/api/node-only/report.get.ts` |
| CSRF | `server/middleware/csrf.ts` |
| Rate Limit | `server/middleware/rate-limit.ts` |
