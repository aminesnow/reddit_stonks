import { Mention } from '../../../models/Mention';
import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './mentions.doc';

/**
 * Get the stonks mentions timeseries (agg by days)
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [async (req: Request, res: Response, next: NextFunction) => {

    const ticker = req.params['ticker'];
    const days = req.query['days'] ? Number(req.query['days']) : 7;
    const source = (req.query['source'] && req.query['source'] != 'all') ? req.query['source'] : undefined;

    let date = new Date();
    date.setDate(date.getDate() - days);

    let where: any = { "ticker": ticker, "created_date": { $gte: date } };
    if (source) {
        where = {
            ...where,
            source
        };
    }

    const timeseries = await Mention.aggregate([
        { $match: where },
        { $group: {
                "_id": {
                    "year": { $year: '$created_date' },
                    "month": { $month: '$created_date' },
                    "day": { $dayOfMonth: '$created_date' }
                },
                "count": { $sum: 1 }
            }
        }, 
        { $sort: { "_id": 1 }
    }]);


    res.status(200).send(timeseries.map(ts => {
        return { 
            ...ts["_id"],
            "count": ts["count"]
        };
    }));

}];


GET.apiDoc = getApiDoc;