import { Schema, model } from 'mongoose';

const User = new Schema({
	name: String,
	username: String,
	password: String,
	birthdate: Date,
	email: String,
	token: String
	/*id: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true},
  username: { type: String, required: true},*/
});

export default model('User', User);

