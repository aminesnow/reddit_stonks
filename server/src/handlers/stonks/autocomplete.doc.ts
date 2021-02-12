
import { OpenAPIV3 } from 'openapi-types';

export const GET: OpenAPIV3.OperationObject = {
  security: [],
  summary: 'List of stonks for autocomplete',
  description: 'List of stonks for autocomplete',
  parameters:[{
    in: 'query',
    name: 'query',
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
