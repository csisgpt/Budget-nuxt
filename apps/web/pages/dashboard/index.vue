<template>
  <div class="space-y-6">
    <div class="grid gap-4 md:grid-cols-4">
      <div v-for="metric in metrics" :key="metric.label" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p class="text-xs text-slate-400">{{ metric.label }}</p>
        <p class="mt-3 text-2xl font-semibold">{{ metric.value }}</p>
        <p class="text-xs text-emerald-500">{{ metric.trend }}</p>
      </div>
    </div>
    <section class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">فعالیت اخیر</h2>
          <NuxtLink to="/dashboard/activity" class="text-xs text-primary">نمایش همه</NuxtLink>
        </header>
        <ul class="mt-4 space-y-3">
          <li v-for="item in activity" :key="item.id" class="text-sm text-slate-600 dark:text-slate-300">
            <strong>{{ item.actor }}</strong>
            <span class="mx-2 text-slate-400">{{ item.action }}</span>
            <span class="text-xs text-slate-400">{{ $dayjs(item.createdAt).fromNow() }}</span>
          </li>
        </ul>
      </div>
      <client-only>
        <RealtimeChart />
      </client-only>
    </section>
  </div>
</template>

<script setup lang="ts">
import RealtimeChart from '~/components/dashboard/RealtimeChart.client.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: ['rbac'],
  requiresAuth: true,
  roles: ['member', 'manager', 'admin', 'owner']
});

const { $dayjs } = useNuxtApp();
useSeoDefaults({ title: 'داشبورد OrgaFlow' });

const metrics = reactive([
  { label: 'پروژه‌های فعال', value: 18, trend: '+12% این هفته' },
  { label: 'وظایف تکمیل شده', value: 245, trend: '+4% نسبت به گذشته' },
  { label: 'اعضای آنلاین', value: computed(() => useRealtime().presence.value), trend: 'پایداری 98%' },
  { label: 'درآمد ماه جاری', value: '$9,200', trend: '+22% رشد' }
]);

const activity = ref([
  { id: '1', actor: 'سارا احمدی', action: 'وظیفه «طراحی داشبورد» را تکمیل کرد', createdAt: new Date().toISOString() },
  { id: '2', actor: 'میلاد رضایی', action: 'سازمان جدیدی دعوت کرد', createdAt: new Date().toISOString() }
]);
</script>
