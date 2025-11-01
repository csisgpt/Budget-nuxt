<template>
  <article class="container prose prose-slate max-w-3xl py-16 dark:prose-invert" dir="rtl">
    <ContentDoc v-slot="{ doc }">
      <header class="mb-10 border-b border-slate-200 pb-6 dark:border-slate-800">
        <p class="text-xs text-slate-400">{{ $dayjs(doc.createdAt).format('YYYY/MM/DD') }}</p>
        <h1 class="mt-2 text-4xl font-bold">{{ doc.title }}</h1>
        <p class="mt-3 text-slate-500">{{ doc.description }}</p>
      </header>
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </article>
</template>

<script setup lang="ts">
const route = useRoute();
const { $dayjs } = useNuxtApp();

useSeoDefaults({ title: route.params.slug?.toString().replace('-', ' ') });

definePageMeta({
  layout: 'public',
  pageTransition: { name: 'fade', mode: 'out-in' }
});
</script>
