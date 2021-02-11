import { OpenAPIV3 } from 'openapi-types';

export const GET: OpenAPIV3.OperationObject = {
    security: [],
    summary: 'Get the mentions of a stonk',
    description: 'Get the mentions of a stonk',
    parameters: [{
        in: 'path',
        name: 'ticker',
        schema: {
            type: 'string',
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
