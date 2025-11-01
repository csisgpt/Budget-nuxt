import { createError, defineEventHandler, getCookie, getHeader, setCookie } from 'h3';

const CSRF_COOKIE = 'orgaflow_csrf';

export default defineEventHandler((event) => {
  if (event.method === 'GET' || event.method === 'HEAD') {
    const token = crypto.randomUUID();
    setCookie(event, CSRF_COOKIE, token, { httpOnly: false, sameSite: 'lax', secure: true });
    event.context.csrfToken = token;
    return;
  }
  const cookieToken = getCookie(event, CSRF_COOKIE);
  const headerToken = getHeader(event, 'x-csrf-token');
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    throw createError({ statusCode: 403, statusMessage: 'CSRF validation failed' });
  }
});
