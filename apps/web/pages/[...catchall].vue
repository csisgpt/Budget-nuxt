<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
    <h1 class="text-6xl font-black">404</h1>
    <p class="mt-4 text-lg">{{ $t('errors.notFound', 'صفحه مورد نظر یافت نشد') }}</p>
    <NuxtLink to="/" class="mt-6 inline-flex items-center gap-2 text-primary underline">
      {{ $t('nav.home') }}
    </NuxtLink>
  </div>
</template>
