<template>
  <div class="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
    <span aria-hidden="true">🟢</span>
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const { presence } = useRealtime();
const label = computed(() => `${presence.value} آنلاین`);
</script>
