import type { H3Event } from 'h3';
import { getHeader } from 'h3';
import { createError } from 'h3';
import { z } from 'zod';

const tenantHeaderSchema = z.string().uuid();

export const resolveTenantFromEvent = (event: H3Event) => {
  const header = getHeader(event, 'x-tenant-id');
  if (!header) {
    throw createError({ statusCode: 400, statusMessage: 'Tenant header missing' });
  }
  const result = tenantHeaderSchema.safeParse(header);
  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid tenant identifier' });
  }
  return result.data;
};
