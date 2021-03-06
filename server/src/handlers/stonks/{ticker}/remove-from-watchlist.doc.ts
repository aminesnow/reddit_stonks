import { OpenAPIV3 } from 'openapi-types';

export const POST: OpenAPIV3.OperationObject = {
  security: [],
  summary: 'Remove the stonk from the watchlist',
  description: 'Remove the stonk from the watchlist',
  tags: ['stonks'],
  parameters: [{
    in: 'path',
    name: 'ticker',
    schema: {
      type: 'string',
    },
    required: true,
  }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {},
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
