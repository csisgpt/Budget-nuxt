<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">مرکز اعلان</h1>
        <p class="text-sm text-slate-500">ترجیحات دریافت اعلان را تنظیم کنید.</p>
      </div>
      <button class="rounded-xl border border-slate-300 px-3 py-2 text-sm" type="button" @click="refresh">بروزرسانی</button>
    </header>
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 class="text-lg font-semibold">اعلان‌های اخیر</h2>
        <ul class="mt-4 space-y-3">
          <li v-for="notification in notifications" :key="notification.id" class="rounded-2xl border border-slate-200/60 p-4 text-sm dark:border-slate-700">
            <div class="flex items-start justify-between">
              <div>
                <p class="font-semibold">{{ notification.title }}</p>
                <p class="text-xs text-slate-400">{{ $dayjs(notification.createdAt).fromNow() }}</p>
              </div>
              <button v-if="!notification.read" class="text-xs text-primary" type="button" @click="mark(notification.id)">
                خوانده شد
              </button>
            </div>
            <p class="mt-2 text-slate-600 dark:text-slate-300">{{ notification.body }}</p>
          </li>
        </ul>
      </div>
      <form class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 class="text-lg font-semibold">ترجیحات</h2>
        <p class="text-xs text-slate-400">نحوه دریافت اعلان‌ها را مشخص کنید.</p>
        <div class="mt-4 space-y-3 text-sm">
          <label class="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <span>ایمیل</span>
            <input v-model="preferences.email" type="checkbox" />
          </label>
          <label class="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <span>اعلان فشار</span>
            <input v-model="preferences.push" type="checkbox" />
          </label>
          <label class="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
            <span>بلادرنگ</span>
            <input v-model="preferences.realtime" type="checkbox" />
          </label>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const store = useNotificationsStore();
const { $dayjs } = useNuxtApp();

const notifications = computed(() => store.notifications);
const preferences = store.preferences;

const refresh = async () => {
  await useFetch('/api/notifications/refresh', { method: 'POST' });
};

const mark = (id: string) => store.markRead(id);

definePageMeta({
  layout: 'dashboard',
  requiresAuth: true
});

useSeoDefaults({ title: 'اعلان‌های OrgaFlow' });
</script>
