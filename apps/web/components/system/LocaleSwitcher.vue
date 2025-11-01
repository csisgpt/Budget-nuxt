<template>
  <button
    type="button"
    class="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1 text-sm hover:border-primary"
    @click="toggle"
  >
    <span aria-hidden="true">🌐</span>
    <span>{{ currentLocaleName }}</span>
  </button>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const currentLocaleName = computed(() => {
  const match = locales.value.find((l) => l.code === locale.value);
  return match?.name || locale.value;
});

const toggle = () => {
  const next = locale.value === 'fa' ? 'en' : 'fa';
  setLocale(next);
  if (process.client) {
    document.documentElement.lang = next === 'fa' ? 'fa' : 'en';
    document.documentElement.dir = next === 'fa' ? 'rtl' : 'ltr';
  }
};
</script>
