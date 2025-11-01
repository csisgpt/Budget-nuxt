import { io } from 'socket.io-client';
import { useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const socket = io(config.public.socketUrl, { path: '/realtime', withCredentials: true });
  nuxtApp.provide('socket', socket);
});
