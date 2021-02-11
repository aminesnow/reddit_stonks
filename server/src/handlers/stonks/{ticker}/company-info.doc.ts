import { OpenAPIV3 } from 'openapi-types';

export const GET: OpenAPIV3.OperationObject = {
  security: [],
  summary: 'Get the company info for a stonk',
  description: 'Get the company info for a stonk',
  parameters: [{
    in: 'path',
    name: 'ticker',
    schema: {
      type: 'string',
    },
    required: true,
  }],
  tags: ['stonks'],
  responses: {
    200: {
      $ref: '#/components/responses/Success',
    },
    default: {
      $ref: '#/components/responses/Errors',
    },
  },
};
