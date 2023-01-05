import { Schema, model } from 'mongoose';

const Event = new Schema({
	title: String,
    image: String,
    description: String,
    lat: Number,
    lng: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: Date,
    location: String,
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    vote_average: {type: Number, min: 0, max: 10, default: 0},
    vote_count: {type: Number, min: 0, default: 0},
});

export default model('Event', Event);