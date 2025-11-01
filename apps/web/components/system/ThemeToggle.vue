<template>
  <button
    class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm hover:border-primary dark:bg-slate-800"
    type="button"
    @click="toggleTheme"
  >
    <span aria-hidden="true" class="text-lg">{{ icon }}</span>
    <span class="sr-only">Toggle theme</span>
  </button>
</template>

<script setup lang="ts">
const themeCookie = useCookie<'light' | 'dark'>('orgaflow_theme', { sameSite: 'lax' });
const theme = useState<'light' | 'dark'>('theme', () => themeCookie.value || 'light');

watch(
  theme,
  (value) => {
    themeCookie.value = value;
    if (process.client) {
      document.documentElement.dataset.theme = value;
      document.documentElement.classList.toggle('dark', value === 'dark');
    }
  },
  { immediate: true }
);

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
};

const icon = computed(() => (theme.value === 'dark' ? '🌙' : '☀️'));
</script>
