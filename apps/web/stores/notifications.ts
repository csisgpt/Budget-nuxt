import { defineStore } from 'pinia';

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  channel: 'email' | 'push' | 'realtime';
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as NotificationItem[],
    preferences: {
      email: true,
      push: false,
      realtime: true
    }
  }),
  actions: {
    addNotification(notification: NotificationItem) {
      this.notifications.unshift(notification);
    },
    markRead(id: string) {
      const item = this.notifications.find((n) => n.id === id);
      if (item) item.read = true;
    },
    updatePreference(channel: NotificationItem['channel'], enabled: boolean) {
      this.preferences[channel] = enabled;
    }
  },
  persist: true
});
