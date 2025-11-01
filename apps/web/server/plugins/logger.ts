import { defineNitroPlugin } from 'nitropack';
import { withRequestLogger } from '../utils/logger';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    withRequestLogger(event);
  });
});
