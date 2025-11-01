import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '~/stores/auth';

describe('useAuthStore', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('stores token and user', () => {
    const store = useAuthStore();
    store.setToken('abc');
    store.setUser({
      id: '1',
      name: 'tester',
      email: 'tester@example.com',
      roles: ['owner'],
      tenantIds: ['t1'],
      twoFactorEnabled: false
    });
    expect(store.token).toBe('abc');
    expect(store.user?.name).toBe('tester');
  });
});
