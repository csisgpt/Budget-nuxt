import type { Socket } from 'socket.io-client';
import { useNotificationsStore } from '~/stores/notifications';

const socketState = useState<Socket | null>('socket', () => null);
const presenceCount = useState<number>('presence-count', () => 0);

export const useRealtime = () => {
  if (process.server) {
    return {
      socket: computed(() => null),
      presence: computed(() => 0)
    };
  }
  const { $socket } = useNuxtApp();

  if (!$socket && !socketState.value) {
    console.warn('Realtime socket not initialised');
  } else if ($socket && socketState.value !== $socket) {
    socketState.value = $socket;
    $socket.on('presence:count', (count: number) => {
      presenceCount.value = count;
    });
    $socket.on('notification:new', (notification) => {
      useNotificationsStore().addNotification(notification);
    });
  }

  return {
    socket: computed(() => socketState.value),
    presence: computed(() => presenceCount.value)
  };
};
