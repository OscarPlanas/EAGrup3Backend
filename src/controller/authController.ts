import { Request, Response } from 'express'
import jwt from "jsonwebtoken";
import CryptoJS from 'crypto-js';
import User from '../model/User';
import IJwtPayload from '../model/IJwtPayload';

const secretoJWT: string = 'NuestraClaveEA3';


export async function login(req: Request, res: Response): Promise<Response> {
    const email = req.body.email;
    const password = req.body.password;
    try {
		const user = await User.findOne({ email });
		
		if (!user) {
			return res.status(404).json({message: "The email does not exist", user});
		}
		const validPassword = CryptoJS.AES.decrypt(user.password as string, 'groupEA2022').toString(CryptoJS.enc.Utf8);
		if (validPassword !== req.body.password) {
			return res.status(402).json({ auth: false, token: null, validPassword, message : 'Invalid Password'});
		}
        const session = { 'id': user.id, 'email': user.email } as IJwtPayload;
        const token = jwt.sign(session, secretoJWT, {
            expiresIn: 60 * 60 * 24
        });
        return res.json({ auth: true, token, session});

	}
	catch (error) {
        return res.status(404).json({ message: "User not found" });
	}
};