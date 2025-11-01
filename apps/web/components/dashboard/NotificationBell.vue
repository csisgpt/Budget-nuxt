<template>
  <button class="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
    <span aria-hidden="true" class="text-lg">🔔</span>
    <span v-if="unreadCount > 0" class="absolute -top-1 -left-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-xs text-white">
      {{ unreadCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
const { notifications } = storeToRefs(useNotificationsStore());
const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length);
</script>
