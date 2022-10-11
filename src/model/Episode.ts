import { Schema, model } from 'mongoose';

const Episode = new Schema({
    id_serie: Number,
    name: String,
    air_date: Date,
    season_number: Number,
    episode_number: Number,
});

export default model('Episode', Episode);