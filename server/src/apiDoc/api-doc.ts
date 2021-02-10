import { OpenAPIV3 } from 'openapi-types';

export const apiDoc: OpenAPIV3.Document = {
  openapi: '3.0.0',
  servers: [{
    url: '/api',
  }],  info: {
    title: 'stonks-server',
    version: '1.0',
  },
  
  components: {
    responses: {
      Errors: {
        description: 'An error occured',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Errors',
            },
          },
        },
      },
      Success: {
        description: 'Success status',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Success',
            },
          },
        },
      },
    },
  },
  paths: {},
};

export default apiDoc;
