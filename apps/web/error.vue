<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100">
    <h1 class="text-5xl font-bold">{{ error.statusCode }}</h1>
    <p class="mt-4 text-lg">{{ error.message || $t('common.error', 'خطایی رخ داده است') }}</p>
    <NuxtLink class="mt-6 underline" to="/">{{ $t('nav.home') }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message?: string } }>();
const error = computed(() => props.error);
</script>
