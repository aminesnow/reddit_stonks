import { OpenAPIV3 } from 'openapi-types';

export const GET: OpenAPIV3.OperationObject = {
  security: [],
  summary: 'Ticker list',
  description: 'Get list of all the tickers in mentions',
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
