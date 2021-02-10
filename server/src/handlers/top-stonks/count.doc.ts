import { OpenAPIV3 } from 'openapi-types';

export const GET: OpenAPIV3.OperationObject = {
  security: [],
  summary: 'Count the top trending stonks on a given period of time',
  description: 'Count the top trending stonks on a given period of time',
  parameters:[{
    in: 'query',
    name: 'days',
    schema: {
      type: 'number',
    },
    required: true,
  },
  {
    in: 'query',
    name: 'source',
    schema: {
      type: 'string',
    },
    required: false,
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
