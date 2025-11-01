<template>
  <section class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold">فعالیت سیستم</h1>
      <p class="text-sm text-slate-500">لیست آخرین عملیات حساس ثبت شده در دفترچه ممیزی.</p>
    </header>
    <ul class="space-y-3">
      <li v-for="item in logs" :key="item.id" class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p class="text-sm font-semibold">{{ item.action }}</p>
        <p class="text-xs text-slate-400">{{ item.actor }} · {{ item.createdAt }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const logs = ref([
  { id: '1', action: 'بروزرسانی نقش کاربر', actor: 'admin@example.com', createdAt: 'هم‌اکنون' },
  { id: '2', action: 'افزودن وب‌هوک جدید', actor: 'admin@example.com', createdAt: '۵ دقیقه پیش' }
]);

definePageMeta({
  layout: 'dashboard',
  requiresAuth: true,
  middleware: ['rbac'],
  roles: ['manager', 'admin', 'owner']
});
</script>
