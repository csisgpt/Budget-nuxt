import type { LocaleMessages, VueMessageType } from 'vue-i18n';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fa',
  fallbackLocale: 'en',
  messages: {} as LocaleMessages<VueMessageType>
}));
