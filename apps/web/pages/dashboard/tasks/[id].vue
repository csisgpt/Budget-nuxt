<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">جزئیات وظیفه</h1>
        <p class="text-sm text-slate-500">شناسه: {{ task?.id }}</p>
      </div>
      <button class="rounded-xl border border-slate-300 px-4 py-2 text-sm" type="button" @click="goBack">بازگشت</button>
    </header>
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p class="text-sm text-slate-500">پروژه: {{ task?.project?.name }}</p>
      <p class="mt-2 text-lg font-semibold">{{ task?.title }}</p>
      <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">{{ task?.description }}</p>
      <p class="mt-4 text-xs text-slate-400">آخرین بروزرسانی {{ $dayjs(task?.updatedAt).fromNow() }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { z } from 'zod';

const route = useRoute();
const { $apiFetch, $dayjs } = useNuxtApp();
const idSchema = z.object({ id: z.string().uuid() });

const validParams = idSchema.safeParse(route.params);
if (!validParams.success) {
  throw createError({ statusCode: 400, statusMessage: 'شناسه نامعتبر است' });
}

const { data: task } = await useAsyncData('task-details', () =>
  $apiFetch(`/tasks/${validParams.data.id}`)
);

definePageMeta({
  layout: 'dashboard',
  requiresAuth: true
});

useSeoDefaults({ title: `جزئیات وظیفه ${task.value?.title ?? ''}` });

const goBack = () => navigateTo('/dashboard/tasks');
</script>
