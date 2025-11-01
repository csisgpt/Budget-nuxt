<template>
  <div class="flex items-center gap-2">
    <label class="text-xs text-slate-500">سازمان</label>
    <select v-model="tenantId" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
      <option v-for="tenant in tenants" :key="tenant.id" :value="tenant.id">{{ tenant.name }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const { tenants, currentTenant, setTenant } = useTenant();

const tenantId = computed({
  get: () => currentTenant.value?.id ?? '',
  set: (id: string) => setTenant(id)
});
</script>
