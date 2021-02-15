import { Request, Response } from 'express';
import { OperationFunction } from 'express-openapi';
import { User } from '../models/User';


import { POST as postApiDoc } from './auth.doc';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../services/env.service'


/**
 * Authenticate with a username and a password
 * @param req Request
 * @param res Response
 */
export const POST: OperationFunction = async (req: Request, res: Response) => {    
    const username = req.body["username"];
    const pwd = req.body["pwd"];
    const JWT_SECRET = getEnvVar("JWT_SECRET") || "";    

    const user = await User.findOne({username: username});
    
    if (user) {
        if (user.validPassword(pwd)) {
            const token = jwt.sign({ username: username }, JWT_SECRET, { algorithm: 'HS256' });
            res.status(200).json({token: token});
        }
        else {
            res.status(401).send({error: 'login failed'});
        }
    } 
    else {
        res.status(404).send({error: 'login failed'});
    }
};



POST.apiDoc = postApiDoc;
