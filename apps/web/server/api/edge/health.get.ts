import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  return {
    status: 'ok',
    region: process.env.NITRO_REGION || 'edge',
    timestamp: Date.now()
  };
});
