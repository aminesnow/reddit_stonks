import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './sources.doc';
import { Mention } from '../../models/Mention'

/**
 * Get stonks subreddits
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [ async (req: Request, res: Response, next: NextFunction) => {

    const sources = await Mention.distinct('source');

    res.status(200).send(sources);
}];


GET.apiDoc = getApiDoc;
