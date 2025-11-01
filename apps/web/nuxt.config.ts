import { resolve } from 'node:path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    'nuxt-simple-sitemap',
    '@sentry/nuxt',
    '~/modules/orga-module'
  ],
  css: ['@orgaflow/ui/tailwind.css', '~/assets/css/tailwind.css'],
  app: {
    rootId: 'orgaflow-app',
    head: {
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl'
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@200;400;600;700&display=swap'
        },
        { rel: 'icon', href: '/logo.svg' }
      ]
    }
  },
  alias: {
    '#ui': resolve('./node_modules/@orgaflow/ui')
  },
  runtimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    redisUrl: process.env.REDIS_URL,
    bullRedisUrl: process.env.BULL_REDIS_URL,
    databaseUrl: process.env.DATABASE_URL,
    sentryDsn: process.env.SENTRY_DSN,
    openAiApiKey: process.env.OPENAI_API_KEY,
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    minio: {
      url: process.env.MINIO_URL,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
      bucket: process.env.MINIO_BUCKET
    },
    stripe: {
      key: process.env.STRIPE_SECRET_KEY
    },
    public: {
      appName: 'OrgaFlow',
      apiBase: '/api',
      socketUrl: process.env.SOCKET_URL || 'http://localhost:3000',
      featureFlags: {
        realtimeNotifications: true,
        betaTasks: false
      },
      localeFallback: 'fa-IR',
      tenantHelperInjected: false,
      pwaEnabled: true
    }
  },
  nitro: {
    preset: process.env.NITRO_PRESET,
    logLevel: 1,
    storage: {
      cache: {
        driver: 'redis',
        url: process.env.REDIS_URL
      }
    },
    routeRules: {
      '/': { prerender: true, headers: { 'cache-control': 's-maxage=3600' } },
      '/blog/**': { swr: 60 },
      '/docs/**': { prerender: true },
      '/dashboard/**': { ssr: true, cache: false },
      '/admin/**': { ssr: true, cache: false },
      '/api/edge/health': { runtime: 'edge', cors: true },
      '/api/node-only/**': { runtime: 'node' }
    },
    hooks: {
      'render:response': (response) => {
        response.headers = {
          ...response.headers,
          'Content-Security-Policy':
            "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; connect-src 'self' https://api.stripe.com",
          'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        };
      }
    }
  },
  experimental: {
    payloadExtraction: true
  },
  content: {
    highlight: {
      theme: 'one-dark-pro'
    },
    markdown: {
      toc: { depth: 3, searchDepth: 3 }
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'OrgaFlow'
  },
  sitemap: {
    sitemaps: true,
    autoLastmod: true
  },
  image: {
    domains: ['images.unsplash.com']
  },
  i18n: {
    defaultLocale: 'fa',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'orgaflow_locale',
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'fa',
        iso: 'fa-IR',
        file: 'fa-IR.json',
        name: 'فارسی',
        dir: 'rtl'
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
        name: 'English',
        dir: 'ltr'
      }
    ],
    lazy: true,
    langDir: 'locales',
    vueI18n: './vue-i18n.options.ts'
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'OrgaFlow',
      short_name: 'OrgaFlow',
      lang: 'fa',
      start_url: '/',
      display: 'standalone',
      theme_color: '#059669',
      background_color: '#ffffff',
      icons: [
        {
          src: '/pwa-icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/offline',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    }
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    integrations: {
      vue: {},
      browserTracing: {}
    },
    tracesSampleRate: 0.2
  },
  imports: {
    dirs: ['composables', 'stores', 'utils']
  },
  build: {
    transpile: ['@heroicons/vue', 'ag-grid-vue3']
  },
  hooks: {
    'i18n:extend-messages': (messages) => {
      messages.fa = messages.fa || {};
      messages.en = messages.en || {};
    }
  }
});
