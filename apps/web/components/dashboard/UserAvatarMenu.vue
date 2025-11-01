<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm dark:bg-slate-900">
      <span class="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-emerald-400" />
      <span>{{ user?.name }}</span>
    </MenuButton>
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="absolute left-0 z-50 mt-2 w-48 origin-top-left rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
        <MenuItem v-slot="{ active }">
          <NuxtLink :class="menuItemClass(active)" to="/dashboard/profile">پروفایل</NuxtLink>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button :class="menuItemClass(active)" type="button" @click="logout">خروج</button>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

const { user, logout } = useAuth();

const menuItemClass = (active: boolean) =>
  [
    'w-full rounded-lg px-3 py-2 text-right text-sm transition',
    active ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300'
  ].join(' ');
</script>
