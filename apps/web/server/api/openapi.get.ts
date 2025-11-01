import { defineEventHandler } from 'h3';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export default defineEventHandler(async () => {
  const specPath = resolve('./public/openapi.json');
  const json = await readFile(specPath, 'utf8');
  return JSON.parse(json);
});
