import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../model/User";
import Event from "../model/Event";

import IJwtPayload from "../model/IJwtPayload";

const secretoJWT: string = 'NuestraClaveEA3';


export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    console.log('VerifyToken');
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {

        jwt.verify(token, secretoJWT);
        
        /*
        console.log("verifyToken");
        req.body.id = decoded.id;
        req.body.title = String(decoded.title);
        req.body.description = String(decoded.description);
        req.body.date = String(decoded.date.toLocaleString());
        req.params.userId = decoded.userId;
        req.params.email = String(decoded.email);
        console.log("errorparams");
        */


        // const user = await User.findById(req.params.userId, { password: 0 });
        // console.log(user);
        // if (!user) {
        //     return res.status(404).json({message: "No user found."});
        // }
        next();
    } catch (error) {
        return res.status(401).json({ auth: false, message: 'Unauthorized' });
    }
};

export async function isOwner (req: Request, res: Response, next: NextFunction) {
    /*try {
        const user = await User.findById(req.params.userId);
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({message: "No event found."});
        }
        const comp = String(event.owner);
        //const result = comp.localeCompare(user.id);
        /*if (result === 0) {
            next();
        } else {
            return res.status(401).json({ auth: false, message: "Not Owner" });
        next();
        } 
    }catch (error) {
        console.log(error);
        return res.status(500).send({message: error});
    }*/
};


