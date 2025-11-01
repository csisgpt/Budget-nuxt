<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-bold">ورود به حساب</h1>
      <p class="text-sm text-slate-500">به فضای کاری خود بازگردید.</p>
    </div>
    <div class="space-y-4">
      <label class="block text-right">
        <span class="text-xs text-slate-500">ایمیل</span>
        <input v-model="values.email" type="email" class="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
        <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
      </label>
      <label class="block text-right">
        <span class="text-xs text-slate-500">گذرواژه</span>
        <input v-model="values.password" type="password" class="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
        <p v-if="errors.password" class="mt-1 text-xs text-red-500">{{ errors.password }}</p>
      </label>
      <label class="block text-right">
        <span class="text-xs text-slate-500">کد دو مرحله‌ای (اختیاری)</span>
        <input v-model="values.totp" type="text" inputmode="numeric" class="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
      </label>
    </div>
    <button type="submit" class="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white">ورود</button>
    <div class="flex items-center justify-between text-xs">
      <NuxtLink to="/auth/forgot-password" class="text-primary">بازیابی رمز</NuxtLink>
      <NuxtLink to="/auth/sign-up" class="text-slate-500">ساخت حساب</NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod';

definePageMeta({
  layout: 'auth'
});

useSeoDefaults({ title: 'ورود به OrgaFlow' });

const auth = useAuth();
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  totp: z.string().optional()
});

const { handleSubmit, errors, values } = useForm(schema);

const onSubmit = handleSubmit(async (formValues) => {
  await auth.login(formValues);
  useToasts().add({ title: 'خوش آمدید', type: 'success' });
  await navigateTo('/dashboard');
});
</script>
