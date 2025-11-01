<template>
  <DashboardLayout>
    <div class="rounded-2xl border border-dashed border-primary/40 bg-white/70 p-6 shadow-sm dark:bg-slate-900/80">
      <slot />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from './dashboard.vue';
</script>
