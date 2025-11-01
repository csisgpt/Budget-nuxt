import { defineStore } from 'pinia';

export interface TenantSummary {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'pro' | 'business';
}

export const useTenantStore = defineStore('tenant', {
  state: () => ({
    tenants: [] as TenantSummary[],
    activeTenantId: ''
  }),
  actions: {
    setTenants(tenants: TenantSummary[]) {
      this.tenants = tenants;
      if (!this.activeTenantId && tenants.length > 0) {
        this.activeTenantId = tenants[0].id;
      }
    },
    setTenant(id: string) {
      this.activeTenantId = id;
    }
  },
  persist: true
});
