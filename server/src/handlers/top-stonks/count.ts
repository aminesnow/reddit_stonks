import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './count.doc';
import { Mention } from '../../models/Mention'

/**
 * Count the top trending stonks on a given period of time
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [async (req: Request, res: Response, next: NextFunction) => {    

    const days = Number(req.query['days']);

    let date = new Date();
    date.setDate(date.getDate() - days);    

    const count = await Mention.countDocuments({ created_date: { $gte: date } });

    res.status(200).json({count: count});
}];


GET.apiDoc = getApiDoc;
