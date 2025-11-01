<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">وظایف</h1>
        <p class="text-sm text-slate-500">وظایف فعال در سازمان {{ currentTenant?.name }}</p>
      </div>
      <div class="flex gap-2">
        <button class="rounded-xl border border-slate-300 px-3 py-2 text-sm" @click="refetch">بروزرسانی</button>
        <button class="rounded-xl bg-primary px-4 py-2 text-sm text-white" type="button" @click="openCreate">وظیفه جدید</button>
      </div>
    </header>
    <ul class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold">{{ task.title }}</h3>
            <p class="text-xs text-slate-400">{{ task.project.name }} · {{ task.status }}</p>
          </div>
          <button class="text-xs text-primary" type="button" @click="viewTask(task.id)">جزئیات</button>
        </div>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">{{ task.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const { currentTenant } = useTenant();
const { $apiFetch } = useNuxtApp();

const tasks = ref([
  {
    id: '1',
    title: 'هماهنگی جلسه با مشتریان',
    project: { id: '1', name: 'مهاجرت پرداخت' },
    status: 'در حال انجام',
    description: 'برنامه‌ریزی جلسه و تهیه اسلایدهای لازم.'
  }
]);

const refetch = async () => {
  const response = await $apiFetch('/tasks', { query: { tenantId: currentTenant.value?.id } });
  tasks.value = response.items;
};

const openCreate = () => {
  useToasts().add({ title: 'ساخت وظیفه جدید', description: 'از API /tasks استفاده کنید.' });
};

const viewTask = (id: string) => {
  navigateTo(`/dashboard/tasks/${id}`);
};

definePageMeta({
  layout: 'dashboard',
  requiresAuth: true
});

useSeoDefaults({ title: 'وظایف OrgaFlow' });
</script>
