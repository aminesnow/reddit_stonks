import { Company } from 'src/models/Company';

import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './autocomplete.doc';

/**
 * List of stonks for autocomplete
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [ async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query['query'];

    const companies = await Company.find({ 
        $or: [
            {'symbol': {$regex : query, $options: 'i'}},
            {'longName': {$regex : query, $options: 'i'}},
        ]
    }).limit(10);

    res.status(200).send(companies.map(c => {
        return {
            "ticker": c["symbol"],
            "longName": c["longName"],
        };
    }));
}];


GET.apiDoc = getApiDoc;
