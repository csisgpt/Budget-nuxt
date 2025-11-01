import { defineEventHandler } from 'h3';
import { requireUserSession } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event);
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.memberships.map((m) => m.role),
      tenantIds: user.memberships.map((m) => m.organizationId),
      twoFactorEnabled: user.totpSecret !== null
    }
  };
});
