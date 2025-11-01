<template>
  <div class="min-h-screen grid place-items-center bg-gradient-to-br from-emerald-100 via-white to-emerald-200 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
    <div class="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-2xl dark:bg-slate-900/80">
      <NuxtLink to="/" class="mb-6 flex items-center justify-center gap-2 text-xl font-bold">
        <img src="/logo.svg" alt="OrgaFlow" class="h-10 w-10" />
        <span>OrgaFlow</span>
      </NuxtLink>
      <slot />
    </div>
  </div>
</template>
