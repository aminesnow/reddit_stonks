import { NextFunction, Request, Response } from 'express';
import { Operation } from 'express-openapi';

import { GET as getApiDoc } from './test.doc';


export const parameters = [];

/**
 * Get api state
 * @param req Request
 * @param res Response
 */
export const GET: Operation = [ (req: Request, res: Response, next: NextFunction) => {
  res.json({ success: true });
}];


GET.apiDoc = getApiDoc;
