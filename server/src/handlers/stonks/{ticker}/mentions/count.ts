import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './count.doc';
import { Mention } from '../../../../models/Mention'

/**
 * Count all the mentions of a stonk
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [async (req: Request, res: Response, next: NextFunction) => {    

    const ticker = req.params['ticker'];
    const source = (req.query['source'] && req.query['source'] != 'all') ? req.query['source'] : undefined;

    let query: any = { "ticker": ticker };
    if (source) {
        query['source'] = source;
    }

    const count = await Mention.countDocuments(query);

    res.status(200).json({count: count});
}];


GET.apiDoc = getApiDoc;
