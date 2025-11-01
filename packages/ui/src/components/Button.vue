<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-transparent px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70',
      variantClass,
      sizeClass
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'outline'>,
    default: 'primary'
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md'
  }
});

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-50';
    case 'outline':
      return 'border-slate-400 text-slate-700 bg-transparent dark:text-slate-100';
    default:
      return 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500';
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1 text-xs';
    case 'lg':
      return 'px-5 py-3 text-base';
    default:
      return 'px-4 py-2 text-sm';
  }
});
</script>
