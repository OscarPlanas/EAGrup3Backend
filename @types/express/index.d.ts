import User from '../../src/model/User.model';
import * as express from 'express';

declare global{
    namespace Express {
        interface Request {
            userId: User._id;
        }
    }
}