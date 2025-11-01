<template>
  <section class="container py-16">
    <header class="mb-12 text-center">
      <h1 class="text-3xl font-bold">مستندات OrgaFlow</h1>
      <p class="mt-3 text-sm text-slate-500">راهنمای کامل برای توسعه‌دهندگان و مدیران سیستم.</p>
    </header>
    <div class="grid gap-6 lg:grid-cols-3">
      <NuxtLink
        v-for="doc in docs"
        :key="doc._path"
        :to="doc._path"
        class="rounded-3xl border border-slate-200 bg-white/80 p-6 text-right shadow-sm transition hover:border-primary dark:border-slate-700 dark:bg-slate-900/80"
      >
        <h2 class="text-lg font-semibold">{{ doc.title }}</h2>
        <p class="mt-2 text-sm text-slate-500">{{ doc.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: docs } = await useAsyncData('docs-list', () => queryContent('/docs').find());

definePageMeta({
  layout: 'public'
});

useSeoDefaults({ title: 'مستندات OrgaFlow' });
</script>
