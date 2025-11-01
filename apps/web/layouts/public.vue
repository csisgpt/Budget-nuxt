<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
    <header class="border-b border-slate-200/70 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <div class="container flex items-center justify-between py-4">
        <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold">
          <img src="/logo.svg" alt="OrgaFlow" class="h-9 w-9" />
          <span>OrgaFlow</span>
        </NuxtLink>
        <nav class="flex items-center gap-4 text-sm">
          <NuxtLink to="/" class="hover:text-primary">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink to="/blog" class="hover:text-primary">{{ $t('nav.blog') }}</NuxtLink>
          <NuxtLink to="/docs" class="hover:text-primary">{{ $t('nav.docs') }}</NuxtLink>
          <NuxtLink to="/dashboard" class="hover:text-primary">{{ $t('nav.dashboard') }}</NuxtLink>
          <LocaleSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="border-t border-slate-200/70 dark:border-slate-800/60 bg-white dark:bg-slate-950">
      <div class="container py-8 text-sm text-slate-500 dark:text-slate-400">
        <p>© {{ new Date().getFullYear() }} OrgaFlow. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import LocaleSwitcher from '~/components/system/LocaleSwitcher.vue';
import ThemeToggle from '~/components/system/ThemeToggle.vue';
</script>
