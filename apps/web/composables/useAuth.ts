import { useAuthStore } from '~/stores/auth';

export const useAuth = () => {
  const store = useAuthStore();
  const { $apiFetch } = useNuxtApp();

  const login = async (credentials: { email: string; password: string; totp?: string }) => {
    const response = await $apiFetch('/auth/login', { method: 'POST', body: credentials });
    store.setToken(response.token);
    store.setUser(response.user);
  };

  const logout = async () => {
    await $apiFetch('/auth/logout', { method: 'POST' });
    store.logout();
    await navigateTo('/');
  };

  const refresh = async () => {
    if (!store.token) return;
    const response = await $apiFetch('/auth/me');
    store.setUser(response.user);
  };

  return {
    user: computed(() => store.user),
    isAuthenticated: computed(() => store.isAuthenticated),
    token: computed(() => store.token),
    login,
    logout,
    refresh
  };
};
