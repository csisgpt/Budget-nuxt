import { Server } from 'socket.io';
import type { H3Event } from 'h3';
import { defineNitroPlugin } from 'nitropack';
import { requireUserSession } from '../utils/auth';

export default defineNitroPlugin((nitroApp) => {
  const io = new Server(nitroApp.h3App.nodeServer, {
    path: '/realtime',
    cors: { origin: '*', credentials: true }
  });

  const presence = new Map<string, string>();

  io.use(async (socket, next) => {
    const event = socket.request as unknown as H3Event;
    try {
      const user = await requireUserSession(event);
      (socket as any).user = user;
      next();
    } catch (error) {
      next(error as Error);
    }
  });

  io.on('connection', (socket) => {
    const user = (socket as any).user;
    presence.set(socket.id, user?.id || socket.id);
    io.emit('presence:count', presence.size);

    socket.on('disconnect', () => {
      presence.delete(socket.id);
      io.emit('presence:count', presence.size);
    });
  });

  nitroApp.hooks.hook('close', () => io.close());
});
