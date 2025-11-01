<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-bold">تنظیم رمز جدید</h1>
      <p class="text-sm text-slate-500">رمز قوی انتخاب کنید.</p>
    </div>
    <label class="block text-right">
      <span class="text-xs text-slate-500">رمز جدید</span>
      <input v-model="password" type="password" class="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
    </label>
    <button type="submit" class="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white">ثبت</button>
  </form>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
});

useSeoDefaults({ title: 'تنظیم رمز جدید' });

const route = useRoute();
const password = ref('');
const { $apiFetch } = useNuxtApp();

const onSubmit = async () => {
  await $apiFetch('/auth/reset-password', {
    method: 'POST',
    body: { token: route.query.token, password: password.value }
  });
  useToasts().add({ title: 'رمز تغییر کرد', type: 'success' });
  await navigateTo('/auth/sign-in');
};
</script>
