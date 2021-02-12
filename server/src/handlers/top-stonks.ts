import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './top-stonks.doc';
import { Mention } from 'src/models/Mention'

/**
 * Get list of the top trending stonks on a given period of time
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [async (req: Request, res: Response, next: NextFunction) => {    

    const days = Number(req.query['days']);
    const size = req.query['size'] ? Number(req.query['size']) : 20;
    const page = req.query['page'] ? Number(req.query['page']) : 0;
    
    const source = (req.query['source'] && req.query['source'] != 'all') ? req.query['source'] : undefined;
    
    let date = new Date();
    date.setDate(date.getDate() - days);    

    let where: any = { created_date: { $gte: date } };
    if (source) {
        where = {
            ...where,
            source
        };
    }

    const tickers = await Mention.aggregate([
        { $match: where },
        { $group: {
                "_id": "$ticker",
                "created_date": { $last: "$$ROOT" },
                "mentions": { $sum: 1 }
            }
        },
        { $sort: { mentions: -1 } },
        { $skip: size * page },
        { $limit: size }
    ]);

    res.status(200).send(tickers.map(t => {
        return {
            "ticker": t["created_date"]["ticker"],
            "latestMention": t["created_date"]["title"],
            "date": t["created_date"]["created_date"],
            "mentions": t["mentions"]
        };
    }));
}];


GET.apiDoc = getApiDoc;
