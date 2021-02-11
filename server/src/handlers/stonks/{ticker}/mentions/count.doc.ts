import { OpenAPIV3 } from 'openapi-types';

export const GET: OpenAPIV3.OperationObject = {
  security: [],
  summary: 'Count all the mentions of a stonk',
  description: 'Count all the mentions of a stonk',
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
