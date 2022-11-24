import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../model/User";
import Event from "../model/Event";

import IJwtPayload from "../model/IJwtPayload";

const secretoJWT: string = 'NuestraClaveEA3';


export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    //console.log('VerifyToken');
    //const us = req.body.user;
    //const tak = us.token;
    const ses = req.params.session;
    const tok = req.userId;
    console.log('VerifyToken', tok);
    //const token = req.header("x-access-token");
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const tokenhead = req.header("x-access-token");

    /*let head = res.header('x-access-token');
    head = token;*/


    console.log('VerifyToken', tok, token, ses, tokenhead);

    if (!token) {
        return res.status(403).json({ message: 'No token provided', tok });
    }
    try {

        const decoded = jwt.verify(token, secretoJWT) as IJwtPayload;

        console.log("verifyToken", decoded);
        
        req.params.userId = decoded.id;

        req.params.title = String(decoded.title);
        req.params.description = String(decoded.description);

        //req.params.date = String(decoded.date.toLocaleString());
        req.params.email = String(decoded.email);
        //req.userId = decoded.id;   

        

        console.log("aaaaaaaaaaaaaa", decoded);
        const user = await User.findById(req.params.userId, { password: 0 });
        //userId = user?.id;
        console.log(user);
        if (!user) {
            return res.status(404).json({message: "No user found."});
        }
        console.log('Creating Event', req.params.userId);

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


