import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return {
    message: 'Welcome from local Orga module',
    timestamp: new Date().toISOString()
  };
});
