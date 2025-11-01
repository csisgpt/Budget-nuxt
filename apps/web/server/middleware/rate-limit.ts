import { createError, defineEventHandler, getRequestHeader } from 'h3';
import { useRedis } from '../utils/redis';

const redis = useRedis();
const WINDOW = 60; // seconds
const LIMIT = 100;

export default defineEventHandler(async (event) => {
  const ip = getRequestHeader(event, 'x-forwarded-for') || event.node.req.socket.remoteAddress || 'unknown';
  const key = `rate:${ip}:${Math.floor(Date.now() / (WINDOW * 1000))}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, WINDOW);
  }
  if (count > LIMIT) {
    throw createError({ statusCode: 429, statusMessage: 'Too Many Requests' });
  }
});
