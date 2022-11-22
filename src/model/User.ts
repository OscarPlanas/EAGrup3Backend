import { Schema, model } from 'mongoose';

const User = new Schema({
	iduser: Number,
	name: String,
	username: String,
	password: String,
	birthdate: Date,
	email: String
});

export default model('User', User);

