import { defineStore } from 'pinia';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  roles: string[];
  tenantIds: string[];
  twoFactorEnabled: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserProfile | null,
    token: null as string | null
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user)
  },
  actions: {
    setUser(user: UserProfile | null) {
      this.user = user;
    },
    setToken(token: string | null) {
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    }
  },
  persist: {
    paths: ['token']
  }
});
