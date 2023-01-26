import { Request, Response } from 'express'
import jwt from "jsonwebtoken";
import CryptoJS from 'crypto-js';
import User from '../model/User';
import IJwtPayload from '../model/IJwtPayload';

const secretoJWT: string = 'NuestraClaveEA3';


export async function login(req: Request, res: Response): Promise<Response> {
    /*console.log('Log in');
    const username = req.body.username;
    const password = req.body.password;
    
    const userFound = await User.findOne();

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    if (userFound.password != password) return res.status(401).json({
            token: null,
            message: "Invalid Password",
        });

    const session = { 'id': username } as IJwtPayload;

    const token = jwt.sign(session, _SECRET, {
            expiresIn: 86400, // 24 hours
        });
    
    console.log (token);
    return res.json(token);*/
    const email = req.body.email;
    const password = req.body.password;
    try {
		const user = await User.findOne({ email });
		
		if (!user) {
			return res.status(404).json({message: "The email does not exist", user});
		}
		//user.password?.toString(),
		const validPassword = CryptoJS.AES.decrypt(user.password as string, 'groupEA2022').toString(CryptoJS.enc.Utf8);

		//const validPassword = CryptoJS.AES.decrypt(user.password, 'groupEA2022').toString(CryptoJS.enc.Utf8);
		if (validPassword !== req.body.password) {
			return res.status(402).json({ auth: false, token: null, validPassword, message : 'Invalid Password'});
		}
        /*const ind = validPassword.localeCompare(password);
        if (ind === 0) {
            const session = { 'id': user.id, 'email': user.email } as IJwtPayload;

		    const token = jwt.sign(session, secretoJWT, {
			    expiresIn: 60 * 60 * 24
		    });
            return res.json({ auth: true, token, session});
        }*/
        const session = { 'id': user.id, 'email': user.email } as IJwtPayload;
        const token = jwt.sign(session, secretoJWT, {
            expiresIn: 60 * 60 * 24
        });
        return res.json({ auth: true, token, session});
		//res.status(201).json({ auth: true, token});
       
       // return res.status(401).json({auth: false, token: null});

	}
	catch (error) {
        //const user = await User.findOne({ email: req.body.email });

        //const pass = req.body.password;
		//const validPassword = CryptoJS.AES.decrypt(user.password!.toString(), 'groupEA2022').toString(CryptoJS.enc.Utf8);

		//res.status(401).send('User not found');
        return res.status(404).json({ message: "User not found" });
	}
};