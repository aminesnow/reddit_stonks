import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';
import { Company } from 'src/models/Company';

import { GET as getApiDoc } from './company-info.doc';

/**
 * Get the company info for a stonk
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [async (req: Request, res: Response, next: NextFunction) => {    

    const ticker = req.params['ticker'];    
    const company = await Company.findOne({ "symbol": ticker });

    if (company) {
        res.status(200).json(company?.toJSON());
    } 
    else {
        res.status(400).send({error: "company not found"});
    }

}];


GET.apiDoc = getApiDoc;