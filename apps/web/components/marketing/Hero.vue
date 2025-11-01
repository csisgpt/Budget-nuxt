<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-400 to-emerald-600 py-20 text-white">
    <div class="container grid gap-10 lg:grid-cols-2 lg:items-center">
      <div class="space-y-6">
        <h1 class="text-4xl font-black leading-tight md:text-5xl">
          {{ $t('hero.title') }}
        </h1>
        <p class="text-lg text-emerald-50">
          {{ $t('hero.subtitle') }}
        </p>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/auth/sign-up"
            class="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-600 shadow-lg"
          >
            شروع رایگان
          </NuxtLink>
          <NuxtLink to="/docs/getting-started" class="inline-flex items-center gap-2 text-sm underline">
            مشاهده مستندات
            <span class="i-mdi-arrow-left"></span>
          </NuxtLink>
        </div>
      </div>
      <div class="relative">
        <div class="rounded-3xl border border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <p class="text-sm font-semibold uppercase text-emerald-100">Live KPIs</p>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl bg-white/20 p-4">
              <p class="text-xs text-emerald-100">میزان تکمیل پروژه‌ها</p>
              <p class="mt-2 text-3xl font-bold">86%</p>
            </div>
            <div class="rounded-2xl bg-white/20 p-4">
              <p class="text-xs text-emerald-100">سازمان‌های فعال</p>
              <p class="mt-2 text-3xl font-bold">128</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
