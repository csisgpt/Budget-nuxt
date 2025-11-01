import '../src/tailwind.css';
import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Locale',
      defaultValue: 'fa',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'fa', title: 'فارسی' },
          { value: 'en', title: 'English' }
        ]
      }
    },
    theme: {
      name: 'Theme',
      description: 'Toggle between light and dark',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ]
      }
    }
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#0f172a' }
      ]
    }
  }
};

export default preview;
