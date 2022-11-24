import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../model/User";
import Event from "../model/Event";

import IJwtPayload from "../model/IJwtPayload";

const secretoJWT: string = 'NuestraClaveEA3';


export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    console.log('VerifyToken');
    const token = req.header("x-access-token");
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {

        const decoded = jwt.verify(token, secretoJWT) as IJwtPayload;

        console.log("verifyToken");
        req.params.id = decoded.id;
        req.params.title = String(decoded.title);
        req.params.description = String(decoded.description);
        req.params.date = String(decoded.date.toLocaleString());
        req.params.userId = decoded.userId;
        req.params.email = decoded.email;


        const user = await User.findById(req.params.id, { password: 0 });
        console.log(user);
        if (!user) {
            return res.status(404).json({message: "No user found."});
        }
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


