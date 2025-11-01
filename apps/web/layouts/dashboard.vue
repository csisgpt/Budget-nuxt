<template>
  <div class="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <div class="flex min-h-screen">
      <aside class="hidden w-64 flex-col border-l border-slate-200/60 bg-white/80 p-6 text-sm dark:border-slate-800 dark:bg-slate-900/80 lg:flex">
        <NuxtLink to="/dashboard" class="mb-6 flex items-center gap-2 text-lg font-bold">
          <img src="/logo.svg" alt="logo" class="h-8 w-8" />
          <span>OrgaFlow</span>
        </NuxtLink>
        <nav class="space-y-2">
          <NuxtLink to="/dashboard" class="block rounded-lg px-3 py-2 hover:bg-primary/10">
            {{ $t('nav.dashboard') }}
          </NuxtLink>
          <NuxtLink to="/dashboard/projects" class="block rounded-lg px-3 py-2 hover:bg-primary/10">
            پروژه‌ها
          </NuxtLink>
          <NuxtLink to="/dashboard/tasks" class="block rounded-lg px-3 py-2 hover:bg-primary/10">
            وظایف
          </NuxtLink>
          <NuxtLink to="/dashboard/notifications" class="block rounded-lg px-3 py-2 hover:bg-primary/10">
            اعلان‌ها
          </NuxtLink>
        </nav>
      </aside>
      <div class="flex-1">
        <header class="flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <TenantSwitcher />
          <div class="flex items-center gap-3">
            <RealtimePresenceIndicator />
            <NotificationBell />
            <UserAvatarMenu />
          </div>
        </header>
        <main class="p-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotificationBell from '~/components/dashboard/NotificationBell.vue';
import RealtimePresenceIndicator from '~/components/dashboard/RealtimePresenceIndicator.vue';
import TenantSwitcher from '~/components/dashboard/TenantSwitcher.vue';
import UserAvatarMenu from '~/components/dashboard/UserAvatarMenu.vue';
</script>
