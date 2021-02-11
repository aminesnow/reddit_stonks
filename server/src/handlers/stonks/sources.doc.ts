import { OpenAPIV3 } from 'openapi-types';

export const GET: OpenAPIV3.OperationObject = {
  security: [],
  summary: 'Get stonks subreddits',
  description: 'Get stonks subreddits',
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
