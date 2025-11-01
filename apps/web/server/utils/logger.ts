import type { H3Event } from 'h3';
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined,
  base: {
    service: 'orgaflow-web'
  }
});

export const withRequestLogger = (event: H3Event) => {
  const start = Date.now();
  const requestId = crypto.randomUUID();
  const child = logger.child({ requestId, url: event.path, method: event.method });
  event.context.logger = child;
  event.node.res.on('finish', () => {
    child.info({ duration: Date.now() - start, status: event.node.res.statusCode }, 'request-complete');
  });
  return child;
};
