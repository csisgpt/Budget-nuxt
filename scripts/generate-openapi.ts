import { OpenAPIObject, InfoObject, PathsObject } from 'openapi3-ts';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const info: InfoObject = {
  title: 'OrgaFlow API',
  version: '1.0.0',
  description: 'Documented REST endpoints for OrgaFlow SaaS'
};

const paths: PathsObject = {
  '/api/auth/login': {
    post: {
      summary: 'Sign in user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 6 }
              },
              required: ['email', 'password']
            }
          }
        }
      },
      responses: {
        '200': { description: 'Authenticated', content: { 'application/json': { schema: { type: 'object' } } } },
        '401': { description: 'Unauthorized' }
      }
    }
  },
  '/api/projects': {
    get: {
      summary: 'List projects',
      parameters: [
        {
          name: 'tenantId',
          in: 'query',
          schema: { type: 'string', format: 'uuid' },
          required: false
        }
      ],
      responses: {
        '200': {
          description: 'Project list',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        status: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/tasks/{id}': {
    get: {
      summary: 'Get task detail',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' }
        }
      ],
      responses: {
        '200': { description: 'Task detail' },
        '404': { description: 'Not found' }
      }
    }
  }
};

const doc: OpenAPIObject = {
  openapi: '3.1.0',
  info,
  paths,
  components: {
    securitySchemes: {
      sessionCookie: {
        type: 'apiKey',
        in: 'cookie',
        name: 'orgaflow_session'
      }
    }
  },
  security: [{ sessionCookie: [] }]
};

writeFileSync(resolve('./apps/web/public/openapi.json'), JSON.stringify(doc, null, 2));
console.log('openapi.json generated');
