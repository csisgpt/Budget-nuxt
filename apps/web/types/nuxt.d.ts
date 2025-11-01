import type { Socket } from 'socket.io-client';
import type { $Fetch } from 'ofetch';

declare module '#app' {
  interface NuxtApp {
    $socket: Socket;
    $apiFetch: $Fetch;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}

export {};
