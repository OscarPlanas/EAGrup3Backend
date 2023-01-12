import { Schema, model } from 'mongoose';

const Series = new Schema({
	title: String,
    overview: String,
    poster_path: String,
    trailer_path: String,
    vote_average: {type: Number, min: 0, max: 10, default: 0},
    vote_count: {type: Number, min: 0, default: 0},
    number_of_seasons: Number,
    number_of_episodes: Number,
    genres: Array,
    status: String,
    networks: Array,
    episodes: [{type: Schema.Types.ObjectId, ref: 'Episode'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
});

export default model('Series', Series);