<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-bold">بازیابی رمز عبور</h1>
      <p class="text-sm text-slate-500">ایمیل خود را وارد کنید تا لینک بازیابی ارسال شود.</p>
    </div>
    <label class="block text-right">
      <span class="text-xs text-slate-500">ایمیل</span>
      <input v-model="email" type="email" class="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
    </label>
    <button type="submit" class="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white">ارسال لینک</button>
  </form>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
});

useSeoDefaults({ title: 'بازیابی رمز عبور' });

const email = ref('');
const { $apiFetch } = useNuxtApp();

const onSubmit = async () => {
  await $apiFetch('/auth/forgot-password', { method: 'POST', body: { email: email.value } });
  useToasts().add({ title: 'ایمیل ارسال شد', type: 'success' });
};
</script>
