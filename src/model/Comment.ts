import { Schema, model } from 'mongoose';

const Comment = new Schema({
    content: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likes: Number,
});

export default model('Comment', Comment);