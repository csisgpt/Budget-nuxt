<template>
  <NuxtLayout>
    <NuxtPage />
    <ToastCenter />
  </NuxtLayout>
</template>

<script setup lang="ts">
import ToastCenter from '~/components/system/ToastCenter.vue';

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} | OrgaFlow` : 'OrgaFlow')
});
</script>
