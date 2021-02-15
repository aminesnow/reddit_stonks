import { Company } from '../../models/Company';
import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './watchlist.doc';
import { Mention } from '../../models/Mention';

/**
 * Get the stonks watchlist
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [async (req: Request, res: Response, next: NextFunction) => {    

    const companies = await Company.find({watchlist: true});
    let watchlist = [];

    for (let index = 0; index < companies.length; index++) {
        const company = companies[index];
        const mention = await Mention.findOne({ "ticker": company.symbol }).sort({created_utc: -1});

        watchlist.push({
            ...mention?.toJSON(),
            longName: company.longName
        });
    }

    res.status(200).send(watchlist);
}];


GET.apiDoc = getApiDoc;
