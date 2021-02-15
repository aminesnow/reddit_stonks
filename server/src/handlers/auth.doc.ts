import { OpenAPIV3 } from 'openapi-types';

export const POST: OpenAPIV3.OperationObject = {
  security: [],
  summary: 'Authenticate with a username and a password',
  description: 'Authenticate with a username and a password',
  tags: ['users'],
  parameters: [{
    in: "formData",
    name: "username"
  },
  {
    in: "formData",
    name: "pwd"
  }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The username',
              nullable: false
            },
            pwd: {
              type: 'string',
              description: 'The password',
              nullable: false
            }
          },
        },
      },
    },
  },
  responses: {
    200: {
      $ref: '#/components/responses/Success',
    },
    default: {
      $ref: '#/components/responses/Errors',
    },
  },
};
