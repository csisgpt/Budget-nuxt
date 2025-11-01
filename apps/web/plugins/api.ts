import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();

  const apiFetch = $fetch.create({
    baseURL: nuxtApp.$config.public.apiBase,
    onRequest({ options }) {
      const headers = new Headers(options.headers);
      if (authStore.token) {
        headers.set('authorization', `Bearer ${authStore.token}`);
      }
      options.headers = headers;
    },
    onResponseError({ response }) {
      if (process.client && response.status === 401) {
        authStore.logout();
        navigateTo('/auth/sign-in');
      }
    }
  });

  return {
    provide: {
      apiFetch
    }
  };
});
