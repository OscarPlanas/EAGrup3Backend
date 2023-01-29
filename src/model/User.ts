import { Schema, model } from 'mongoose';

const User = new Schema({
	name: String,
	username: String,
	password: String,
	birthdate: Date,
	email: String,
	avatar: String,
	isAdmin: Boolean,
	serie: [{
		type: Schema.Types.ObjectId,
		ref: 'Series'
	}],
	event: [{
		type: Schema.Types.ObjectId,
		ref: 'Event'
	}],
	comment: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
});

export default model('User', User);

