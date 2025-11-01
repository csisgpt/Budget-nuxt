import { useTenantStore } from '~/stores/tenant';

export const useTenant = () => {
  const store = useTenantStore();
  const { $apiFetch } = useNuxtApp();

  const loadTenants = async () => {
    const data = await $apiFetch('/tenants');
    store.setTenants(data.tenants);
  };

  const setTenant = (id: string) => {
    store.setTenant(id);
    useCookie('orgaflow_tenant', { sameSite: 'lax' }).value = id;
  };

  watchEffect(() => {
    if (process.client) {
      document.body.dataset.tenant = store.activeTenantId;
    }
  });

  return {
    tenants: computed(() => store.tenants),
    currentTenant: computed(() => store.tenants.find((t) => t.id === store.activeTenantId)),
    loadTenants,
    setTenant
  };
};
