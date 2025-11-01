export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth();
  if (process.server) return;
  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    return navigateTo('/auth/sign-in');
  }
});
