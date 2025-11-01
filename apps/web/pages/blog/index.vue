<template>
  <section class="container py-16">
    <header class="mb-10 space-y-3 text-center">
      <h1 class="text-3xl font-bold">وبلاگ اورگافلو</h1>
      <p class="text-sm text-slate-500">تحلیل‌ها، اخبار محصول و بهترین تجربیات برای تیم‌های چندسازمانی.</p>
    </header>
    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="post in posts" :key="post._path" class="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <NuxtLink :to="post._path" class="text-lg font-semibold">{{ post.title }}</NuxtLink>
        <p class="mt-2 text-sm text-slate-500">{{ post.description }}</p>
        <p class="mt-4 text-xs text-slate-400">{{ $dayjs(post.createdAt).format('YYYY/MM/DD') }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $dayjs } = useNuxtApp();
const { data: posts } = await useAsyncData('blog-list', () => queryContent('/blog').sort({ createdAt: -1 }).find());

definePageMeta({
  layout: 'public'
});

useSeoDefaults({ title: 'وبلاگ OrgaFlow' });
</script>
