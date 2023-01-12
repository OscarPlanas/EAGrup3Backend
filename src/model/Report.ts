import { Schema, model } from 'mongoose';

const Report = new Schema({
    owner: String,
    user_to_report: String,
    reason: String,

});

export default model('Report', Report);
        