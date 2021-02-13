import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './tickers.doc';
import { Mention } from '../../models/Mention'

/**
 * Get list of all the tickers in mentions
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [ async (req: Request, res: Response, next: NextFunction) => {

    const tickers = await Mention.distinct('ticker');

    res.status(200).send(tickers);
}];


GET.apiDoc = getApiDoc;
