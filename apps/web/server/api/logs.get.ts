import { defineEventHandler, sendStream } from 'h3';
import { Readable } from 'node:stream';

export default defineEventHandler((event) => {
  const stream = Readable.from(['OrgaFlow log stream\n', `timestamp: ${new Date().toISOString()}\n`]);
  return sendStream(event, stream);
});
