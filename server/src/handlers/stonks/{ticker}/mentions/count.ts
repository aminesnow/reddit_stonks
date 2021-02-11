import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './count.doc';
import { Mention } from 'src/models/Mention'

/**
 * Count all the mentions of a stonk
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [async (req: Request, res: Response, next: NextFunction) => {    

    const ticker = req.params['ticker'];
    const count = await Mention.countDocuments({ "ticker": ticker });

    res.status(200).json({count: count});
}];


GET.apiDoc = getApiDoc;
