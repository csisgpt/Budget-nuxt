<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100">
    <h1 class="text-4xl font-bold">آفلاین هستید</h1>
    <p class="mt-4 text-sm text-slate-300">لطفاً پس از اتصال مجدد تلاش کنید. محتوای ذخیره‌شده همچنان در دسترس است.</p>
    <button class="mt-6 rounded-xl bg-primary px-4 py-2 text-sm" type="button" @click="reload">تلاش مجدد</button>
  </div>
</template>

<script setup lang="ts">
const reload = () => location.reload();
</script>
