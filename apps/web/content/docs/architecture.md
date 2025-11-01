---
title: "معماری سیستم"
description: "نمای کلی اجزای اصلی OrgaFlow"
---

## Nuxt 3
- رندر ترکیبی (SSR برای داشبورد، SSG برای بازاریابی، ISR برای وبلاگ)
- مسیرهای API با Nitro و کش Redis
- ماژول محلی `orga-module` برای افزودن هندلرهای مشترک

## Backend
- PostgreSQL و Prisma با مدل‌های چندمستاجری
- BullMQ + Redis برای صف‌های ایمیل و وب‌هوک
- Socket.io برای حضور و اعلان‌ها
- Stripe برای اشتراک‌ها

## Observability
- Pino برای لاگ
- Sentry برای ردیابی خطا
- OpenAPI + Swagger در `/api/docs`
