<template>
  <div class="fixed bottom-6 left-6 z-[1000] space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="min-w-[240px] rounded-xl border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"
      :class="toast.type === 'error' ? 'border-red-300 text-red-700' : toast.type === 'success' ? 'border-emerald-300 text-emerald-700' : ''"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-semibold">{{ toast.title }}</p>
          <p v-if="toast.description" class="text-xs text-slate-500 dark:text-slate-300">{{ toast.description }}</p>
        </div>
        <button class="text-xs text-slate-400" type="button" @click="remove(toast.id!)">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { toasts, remove } = useToasts();
</script>
