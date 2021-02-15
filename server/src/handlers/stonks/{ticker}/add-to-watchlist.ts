import { Request, Response } from 'express';
import { OperationFunction } from 'express-openapi';
import { Company } from '../../../models/Company';

import { POST as postApiDoc } from './add-to-watchlist.doc';

/**
 * Add the stonk to the watchlist
 * @param req Request
 * @param res Response
 */
export const POST: OperationFunction = async (req: Request, res: Response) => {
    const ticker = req.params['ticker'];    
    const company = await Company.findOne({ "symbol": ticker });

    if (company) {
        company.watchlist = true;
        await company.save();

        res.status(200).json(company.toJSON());
        
    } 
    else {
        res.status(404).send({error: "company not found"});
    }

};



POST.apiDoc = postApiDoc;
