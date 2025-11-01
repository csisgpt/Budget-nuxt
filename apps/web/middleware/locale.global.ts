export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const locale = useCookie('orgaflow_locale').value;
    if (locale) {
      document.documentElement.lang = locale === 'fa' ? 'fa' : 'en';
      document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
    }
  }
});
