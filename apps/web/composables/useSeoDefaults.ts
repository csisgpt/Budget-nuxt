interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
}

export const useSeoDefaults = (options: SeoOptions = {}) => {
  const config = useRuntimeConfig();
  const title = options.title || 'OrgaFlow - SaaS مدیریت سازمانی';
  const description =
    options.description ||
    'اورگافلو پلتفرم کامل برای مدیریت پروژه، سازمان و تیم با امکانات پیشرفته همکاری، اعلان بلادرنگ و صورتحساب است.';

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: options.image || `${config.public.apiBase}/og/cover.png`,
    twitterCard: 'summary_large_image',
    canonical: options.canonical || `${config.public.apiBase}${useRoute().fullPath}`
  });
};
