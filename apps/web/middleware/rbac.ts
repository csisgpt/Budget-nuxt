export default defineNuxtRouteMiddleware((to) => {
  const requiredRoles = (to.meta.roles as string[] | undefined) || [];
  if (!requiredRoles.length) return;
  const auth = useAuth();
  if (!auth.user.value) {
    return navigateTo('/auth/sign-in');
  }
  const hasRole = requiredRoles.some((role) => auth.user.value?.roles.includes(role));
  if (!hasRole) {
    return abortNavigation({ statusCode: 403, statusMessage: 'Forbidden' });
  }
});
