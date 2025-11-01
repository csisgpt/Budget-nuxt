<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">پرچم‌های ویژگی</h1>
        <p class="text-sm text-slate-500">کنترل تدریجی قابلیت‌ها برای مستاجران.</p>
      </div>
      <button class="rounded-xl border border-slate-300 px-3 py-2 text-sm" type="button" @click="refresh">بازخوانی</button>
    </header>
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table class="w-full table-fixed text-sm">
        <thead class="text-xs text-slate-400">
          <tr>
            <th class="py-2">نام</th>
            <th>شرح</th>
            <th>وضعیت</th>
            <th>گروه هدف</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flag in flags" :key="flag.key" class="border-t border-slate-100 text-slate-600 dark:border-slate-800 dark:text-slate-300">
            <td class="py-3 font-semibold">{{ flag.name }}</td>
            <td>{{ flag.description }}</td>
            <td>
              <span :class="flag.enabled ? 'text-emerald-500' : 'text-slate-400'">{{ flag.enabled ? 'فعال' : 'غیرفعال' }}</span>
            </td>
            <td>{{ flag.rollout }}</td>
            <td>
              <button class="text-xs text-primary" type="button" @click="toggle(flag.key)">
                {{ flag.enabled ? 'غیرفعال سازی' : 'فعال سازی' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $apiFetch } = useNuxtApp();

const flags = ref([
  { key: 'realtimeNotifications', name: 'اعلان بلادرنگ', description: 'ارسال آنی اعلان‌ها با Socket.io', enabled: true, rollout: '100%' },
  { key: 'betaTasks', name: 'نسخه جدید وظایف', description: 'تجربه جدید مدیریت وظایف', enabled: false, rollout: '10% مستاجران' }
]);

const refresh = async () => {
  flags.value = await $apiFetch('/admin/feature-flags');
};

const toggle = async (key: string) => {
  await $apiFetch(`/admin/feature-flags/${key}`, { method: 'PATCH' });
  refresh();
  useToasts().add({ title: 'بروزرسانی شد', type: 'success' });
};

definePageMeta({
  layout: 'admin',
  requiresAuth: true,
  middleware: ['rbac'],
  roles: ['admin', 'owner']
});

useSeoDefaults({ title: 'پرچم‌های ویژگی' });
</script>
