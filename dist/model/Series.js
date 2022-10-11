"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Series = new mongoose_1.Schema({
    title: String,
    overview: String,
    poster_path: String,
    trailer_path: String,
    vote_average: { type: Number, min: 0, max: 10, default: 0 },
    vote_count: { type: Number, min: 0, default: 0 },
    number_of_seasons: Number,
    number_of_episodes: Number,
    genres: Array,
    status: String,
    networks: Array,
    episodes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Episode' }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }],
});
exports.default = (0, mongoose_1.model)('Series', Series);
//# sourceMappingURL=Series.js.map