import { Schema, model } from 'mongoose';

const Episode = new Schema({
    serie: {
		type: Schema.Types.ObjectId,
		ref: "Series"
	},
    // id_serie: Number,
    name: String,
    air_date: Date,
    season_number: Number,
    episode_number: Number,
});

export default model('Episode', Episode);