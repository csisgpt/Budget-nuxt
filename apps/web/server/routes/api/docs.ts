import { defineEventHandler } from 'h3';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const swaggerHtml = (spec: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>OrgaFlow API</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      SwaggerUIBundle({
        dom_id: '#swagger',
        spec: ${spec}
      });
    </script>
  </body>
</html>`;

export default defineEventHandler(async () => {
  const spec = await readFile(resolve('./public/openapi.json'), 'utf8');
  return new Response(swaggerHtml(spec), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
});
