<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-bold">ساخت حساب جدید</h1>
      <p class="text-sm text-slate-500">در کمتر از یک دقیقه سازمان خود را بسازید.</p>
    </div>
    <div class="space-y-4">
      <label class="block text-right">
        <span class="text-xs text-slate-500">نام کامل</span>
        <input v-model="values.name" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
        <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
      </label>
      <label class="block text-right">
        <span class="text-xs text-slate-500">ایمیل کاری</span>
        <input v-model="values.email" type="email" class="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
        <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
      </label>
      <label class="block text-right">
        <span class="text-xs text-slate-500">نام سازمان</span>
        <input v-model="values.organization" type="text" class="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
      </label>
      <label class="block text-right">
        <span class="text-xs text-slate-500">گذرواژه</span>
        <input v-model="values.password" type="password" class="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
        <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password }}</p>
      </label>
    </div>
    <button type="submit" class="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white">ساخت حساب</button>
    <p class="text-center text-xs text-slate-500">
      ثبت‌نام یعنی شرایط استفاده و حریم خصوصی را پذیرفته‌اید.
    </p>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod';

definePageMeta({
  layout: 'auth'
});

useSeoDefaults({ title: 'ساخت حساب OrgaFlow' });

const auth = useAuth();
const { $apiFetch } = useNuxtApp();

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  organization: z.string().min(2),
  password: z.string().min(8)
});

const { handleSubmit, errors, values } = useForm(schema);

const onSubmit = handleSubmit(async (formValues) => {
  await $apiFetch('/auth/sign-up', { method: 'POST', body: formValues });
  useToasts().add({ title: 'ایمیل تایید ارسال شد', type: 'info' });
  await auth.login({ email: formValues.email, password: formValues.password });
  await navigateTo('/dashboard');
});
</script>
