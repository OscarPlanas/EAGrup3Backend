import { Schema, model } from 'mongoose';

const User = new Schema({
	name: String,
	username: String,
	password: String,
	birthdate: Date,
	email: String
});

export default model('User', User);

