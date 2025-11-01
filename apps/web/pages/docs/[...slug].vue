<template>
  <div class="lg:grid lg:grid-cols-[280px_1fr]">
    <aside class="hidden border-l border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/80 lg:block">
      <ContentNavigation v-slot="{ navigation }" :query="{ path: '/docs' }">
        <nav class="space-y-2 text-sm">
          <NuxtLink
            v-for="item in navigation"
            :key="item._path"
            :to="item._path"
            class="block rounded-xl px-3 py-2 hover:bg-primary/10"
          >
            {{ item.title }}
          </NuxtLink>
        </nav>
      </ContentNavigation>
    </aside>
    <article class="prose prose-slate max-w-none p-6 dark:prose-invert" dir="rtl">
      <ContentDoc />
    </article>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'public',
  key: (route) => route.fullPath,
  pageTransition: { name: 'slide-fade' }
});

useSeoDefaults({ title: 'مستندات' });
</script>
