<template>
  <div>
    <HeroSection />
    <section class="container py-16">
      <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100">ویژگی‌های اصلی</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <article class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 class="text-lg font-semibold">چند مستاجری واقعی</h3>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
            هر سازمان فضا، داده و اعضای خاص خود را دارد. احراز هویت و نقش‌ها به صورت دقیق مدیریت می‌شوند.
          </p>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 class="text-lg font-semibold">پشتیبانی بلادرنگ</h3>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
            حضور کاربران، اعلان‌ها و ویرایش همزمان با Socket.io و صف‌های BullMQ.
          </p>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 class="text-lg font-semibold">درآمد مبتنی بر اشتراک</h3>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
            طرح‌های متنوع با Stripe Billing، صورتحساب و مدیریت اشتراک خودکار.
          </p>
        </article>
      </div>
    </section>
    <section class="bg-slate-900 py-16 text-white">
      <div class="container grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 class="text-3xl font-black">یکپارچگی کامل با ابزارها</h2>
          <p class="mt-4 text-sm text-slate-200">
            اتصال به Zapier، Stripe، Google Workspace، و هر سرویس دیگر از طریق وب‌هوک‌های ایمن و API کاملاً تایپ شده.
          </p>
        </div>
        <div class="rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur">
          <p class="text-xs uppercase text-slate-200">Status</p>
          <p class="mt-4 text-lg font-semibold">API latency: 120ms · Queue depth: 4 jobs · 99.99% uptime</p>
        </div>
      </div>
    </section>
    <section class="container py-20">
      <div class="rounded-3xl border border-slate-200 bg-white/70 p-10 shadow-lg dark:border-slate-700 dark:bg-slate-900/70">
        <h2 class="text-3xl font-bold">آماده تجربه نسل بعدی بهره‌وری هستید؟</h2>
        <p class="mt-4 text-slate-500 dark:text-slate-300">همین حالا ثبت‌نام کنید و ۱۴ روز نسخه حرفه‌ای را رایگان امتحان کنید.</p>
        <NuxtLink to="/auth/sign-up" class="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
          شروع کنید
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/marketing/Hero.vue';

definePageMeta({
  layout: 'public'
});

useSeoDefaults({ title: 'OrgaFlow | مدیریت هوشمند سازمان‌ها' });
</script>
