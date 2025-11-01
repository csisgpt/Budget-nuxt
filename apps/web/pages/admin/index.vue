<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">داشبورد مدیر کل</h1>
        <p class="text-sm text-slate-500">نمای کلی وضعیت سیستم و اشتراک‌ها.</p>
      </div>
      <button class="rounded-xl border border-slate-300 px-3 py-2 text-sm" type="button" @click="refresh">بازخوانی</button>
    </header>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-800 shadow-sm">
        <p class="text-xs uppercase">کاربران فعال</p>
        <p class="mt-2 text-3xl font-bold">{{ metrics.activeUsers }}</p>
      </div>
      <div class="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-700 shadow-sm">
        <p class="text-xs uppercase">سازمان‌ها</p>
        <p class="mt-2 text-3xl font-bold">{{ metrics.organizations }}</p>
      </div>
      <div class="rounded-3xl border border-sky-200 bg-sky-50 p-6 text-sky-700 shadow-sm">
        <p class="text-xs uppercase">درآمد ماه جاری</p>
        <p class="mt-2 text-3xl font-bold">${{ metrics.mrr }}</p>
      </div>
      <div class="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
        <p class="text-xs uppercase">صف‌های معوق</p>
        <p class="mt-2 text-3xl font-bold">{{ metrics.pendingJobs }}</p>
      </div>
    </div>
    <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 class="text-lg font-semibold">گزارش اشتراک‌ها</h2>
      <table class="mt-4 w-full table-fixed text-sm">
        <thead>
          <tr class="text-right text-xs text-slate-400">
            <th class="py-2">طرح</th>
            <th>کاربران</th>
            <th>MRR</th>
            <th>آخرین بروزرسانی</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plan in subscriptionReport" :key="plan.name" class="border-t border-slate-100 text-slate-600 dark:border-slate-800 dark:text-slate-300">
            <td class="py-3">{{ plan.name }}</td>
            <td>{{ plan.accounts }}</td>
            <td>${{ plan.mrr }}</td>
            <td>{{ plan.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<script setup lang="ts">
const { $apiFetch } = useNuxtApp();

const metrics = reactive({
  activeUsers: 0,
  organizations: 0,
  mrr: 0,
  pendingJobs: 0
});

const subscriptionReport = ref([
  { name: 'Free', accounts: 85, mrr: 0, updatedAt: 'امروز' },
  { name: 'Pro', accounts: 42, mrr: 5600, updatedAt: '۱ ساعت پیش' },
  { name: 'Business', accounts: 12, mrr: 8400, updatedAt: '۲ ساعت پیش' }
]);

const refresh = async () => {
  const response = await $apiFetch('/admin/metrics');
  Object.assign(metrics, response.metrics);
  subscriptionReport.value = response.subscriptionReport;
};

definePageMeta({
  layout: 'admin',
  requiresAuth: true,
  middleware: ['rbac'],
  roles: ['admin', 'owner']
});

useSeoDefaults({ title: 'کنترل پنل مدیر' });

onMounted(refresh);
</script>
