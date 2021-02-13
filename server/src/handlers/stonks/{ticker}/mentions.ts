import { Mention } from '../../../models/Mention';
import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './mentions.doc';

/**
 * Get the mentions of a stonk
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [async (req: Request, res: Response, next: NextFunction) => {

    const ticker = req.params['ticker'];
    const size = req.query['size'] ? Number(req.query['size']) : 20;
    const page = req.query['page'] ? Number(req.query['page']) : 0;

    const source = (req.query['source'] && req.query['source'] != 'all') ? req.query['source'] : undefined;

    let query: any = { "ticker": ticker };
    if (source) {
        query['source'] = source;
    }

    const mentions = await Mention.find(query).sort({ "created_date": -1 }).skip(size * page).limit(size);

    res.status(200).send(mentions);

}];


GET.apiDoc = getApiDoc;