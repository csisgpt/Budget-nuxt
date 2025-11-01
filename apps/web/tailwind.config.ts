import type { Config } from 'tailwindcss';

export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app/**/*.{vue,ts}',
    './plugins/**/*.{js,ts}',
    './stories/**/*.{ts,vue}',
    '../../packages/ui/src/**/*.{ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        secondary: '#0f172a'
      }
    }
  },
  plugins: []
} satisfies Config;
