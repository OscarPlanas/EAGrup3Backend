import User from '../../src/model/User';
import * as express from 'express';
declare global{
    namespace Express {
        interface Request {
            userId: User._userid;
        }
    }
}