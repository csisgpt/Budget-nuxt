<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">پروژه‌ها</h1>
        <p class="text-sm text-slate-500">مدیریت پروژه‌های سازمان و وضعیت‌ها.</p>
      </div>
      <button class="rounded-xl bg-primary px-4 py-2 text-sm text-white" type="button" @click="openNewProject">
        پروژه جدید
      </button>
    </header>
    <div class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <AgGridVue class="ag-theme-quartz h-[520px] w-full" :columnDefs="columnDefs" :rowData="rowData" :rowModelType="'clientSide'" @grid-ready="onGridReady" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GridApi } from 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3';

const { $apiFetch } = useNuxtApp();
const gridApi = shallowRef<GridApi | null>(null);

const columnDefs = ref([
  { field: 'name', headerName: 'نام پروژه', sortable: true, filter: true },
  { field: 'status', headerName: 'وضعیت', sortable: true },
  { field: 'owner', headerName: 'مالک', sortable: true },
  { field: 'updatedAt', headerName: 'آخرین بروزرسانی', sortable: true }
]);

const rowData = ref([
  { id: '1', name: 'مهاجرت سرویس پرداخت', status: 'در حال انجام', owner: 'سارا احمدی', updatedAt: '2 ساعت پیش' },
  { id: '2', name: 'داشبورد مدیریت', status: 'تحویل شده', owner: 'میلاد رضایی', updatedAt: 'دیروز' }
]);

const fetchProjects = async () => {
  const response = await $apiFetch('/projects');
  rowData.value = response.items;
};

const onGridReady = (params: { api: GridApi }) => {
  gridApi.value = params.api;
  fetchProjects();
};

const openNewProject = () => {
  useToasts().add({ title: 'فرم پروژه جدید', description: 'این قسمت در نسخه دمو است.' });
};

definePageMeta({
  layout: 'dashboard',
  requiresAuth: true,
  middleware: ['rbac'],
  roles: ['manager', 'admin', 'owner']
});

useSeoDefaults({ title: 'پروژه‌های OrgaFlow' });
</script>

<style>
@import 'ag-grid-community/styles/ag-grid.css';
@import 'ag-grid-community/styles/ag-theme-quartz.css';
</style>
