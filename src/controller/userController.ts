import User from '../model/User';
import Serie from '../model/Series';
import Comment from '../model/Comment';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import IJwtPayload from '../model/IJwtPayload';
// import { FileArray } from 'express-fileupload';
import fs from 'fs';

const secretoJWT: string = 'NuestraClaveEA3';

const register = async (req: Request, res: Response) => {
	const name = req.body.name;
	const username = req.body.username;
	const birthdate = req.body.birthdate;
	const email = req.body.email;
	
	let password = req.body.password;
	password = CryptoJS.AES.encrypt(password, 'groupEA2022').toString();
	const newUser = new User({ name, username, email, password, birthdate, isAdmin: false });
	await newUser.save( (err: any) => {
		if (err) {
			return res.status(500).send(err);
		}
	});
	const session = { id: username } as IJwtPayload;

	const token = jwt.sign({ id: newUser._id }, secretoJWT, {
		expiresIn: 60 * 60 * 24
	});
	res.status(200).json({ auth: true, token, id: newUser._id });
};

const profile = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id, { password: 0 }).populate('serie').populate('event').populate({ path: 'comment', populate: { path: 'owner' } });
	if (!user) {
		return res.status(404).send('No user found.');
	}

	res.status(200).json(user);
};

const getall = async (req: Request, res: Response) => {
	const users = await User.find().populate('serie');
	res.status(200).json(users);
};

const getone = async (req: Request, res: Response) => {
	const user = await User.findOne({ username: req.params.username }).populate('serie');
	res.json(user);
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		await User.findByIdAndRemove(req.params.id);
		res.status(200).json({ status: 'User deleted' });
	}
	catch (error) {
		res.status(500).json({message: 'error unknown', error });
	}
};

const update = async (req: Request, res: Response) => {
	try{
		const name = req.body.name;
		const username = req.body.username;
		const birthdate = req.body.birthdate;
		const email = req.body.email;
		const isAdmin = req.body.isAdmin;
		const user = await User.findByIdAndUpdate(req.params.id, {
			name, username, birthdate, email, isAdmin
		}, {new: true});
		res.json(user).status(200);
	}catch (error) {
		res.status(401).send(error);
	}
};

/*const addAvatar = async (req: Request, res: Response) => {
	const { idUser, avatar } = req.body;
	try {
		
		const user = await User.findById(idUser);
		//const avatar = req.body.avatar;
		if (!user) {
			return res.status(404).send('No user or serie found.');
		}
		
		 
		await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { avatar: avatar } });

		res.status(200).json({ status: 'Avatar added', avatar });
		

	}catch (error) {
		res.status(500).json({message: 'error unknown', error });
	}

}*/

const addSerie = async (req: Request, res: Response) => {
	 const user = await User.findById(req.params.idUser);
     if (!user) {
         return res.status(404).send('The user does not exist');
     }
    const serie = await Serie.findById(req.params.idSerie);
	 if (!serie) {
	 	return res.status(404).send('The series does not exist');
	 }

	user.updateOne({ $push: { serie: serie._id } }, (err: any) => {
	 	if (err) {
	 		return res.status(500).send(err);
	 	}
         user.save();
         res.status(200).json({ status: 'Serie saved' });
     });

}

const delSerie = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.idUser);
	if (!user) {
		return res.status(404).send('The user does not exist');
	}
	const serie = await Serie.findById(req.params.idSerie);
	if (!serie) {
		return res.status(404).send('The series does not exist');
	}

	user.updateOne({ $pull: { serie: serie._id } }, (err: any) => {
		if (err) {
			return res.status(500).send(err);
		}
		user.save();
		res.status(200).json({ status: 'Serie deleted' });
	});
}

const addComment = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.idUser);
	if (!user) {
		return res.status(404).send('The user does not exist');
	}
	const comment = new Comment(req.body);
    await comment.save( (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
	user.updateOne({ $push: { comment: comment._id } }, (err: any) => {
		user.save();
		res.status(200).json({ status: 'Comment saved' });
	});
}

const uploadAvatar = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
    // Get the file that was set to our field named "image"
	const { image } = req.files as any;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
	const ext =	image.name.split('.').pop();
	console.log(process.env.PATH)
    image.mv('./src/upload/profile/' + user?._id + '.' + ext);
	// console.log(ext);
	// console.log(__dirname + '/upload/profile/' + image.name);
	// console.log(req.files);
    res.sendStatus(200);
}


export default {
	register,
	profile,
	getall,
	getone,
	deleteUser,
	update,
	addSerie,
	delSerie,
	addComment,
	uploadAvatar
};