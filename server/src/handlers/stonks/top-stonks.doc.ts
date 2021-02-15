import { OpenAPIV3 } from 'openapi-types';

export const GET: OpenAPIV3.OperationObject = {
  security: [],
  summary: 'List of the top trending stonks on a given period of time',
  description: 'List of the top trending stonks on a given period of time',
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
    name: 'page',
    schema: {
      type: 'number',
    },
    required: false,
  },
  {
    in: 'query',
    name: 'size',
    schema: {
      type: 'number',
    },
    required: false,
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
