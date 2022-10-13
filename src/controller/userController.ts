import User from '../model/User';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const register = async (req: Request, res: Response) => {
	const name = req.body.name;
	const email = req.body.email;
	let password = req.body.password;
	password = CryptoJS.AES.encrypt(password, 'groupEA2022').toString();
	const newUser = new User({ name, email, password });
	await newUser.save( (err: any) => {
		if (err) {
			return res.status(500).send(err);
		}
	});
	const token = jwt.sign({ id: newUser._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token });
};

const login = async (req: Request, res : Response) => {
	const email = req.body.email;
	let password = req.body.password;
	password = CryptoJS.AES.encrypt(password, 'groupEA2022').toString();
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).send('The email does not exist');
	}
	else if (password.match(user.password) === true) {

		const token = jwt.sign({ id: user._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
			expiresIn: 60 * 60 * 24
		});
		res.status(200).json({ auth: true, token });
	}
	else{
		return res.status(401).json({ auth: false, token: null });
	}
};

const profile = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id, { password: 0 });
	if (!user) {
		return res.status(404).send('No user found.');
	}
	res.status(200).json(user);
};

const getall = async (req: Request, res: Response) => {
	const users = await User.find();
	res.status(200).json(users);
};

const getone = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	res.json(user);
};

export default {
	register,
	login,
	profile,
	getall,
	getone
};