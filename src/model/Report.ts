import { Schema, model } from 'mongoose';

const Report = new Schema({
    owner: String,
    user_reported: String,
    reason: String,
    date: Date,

});

export default model('Report', Report);