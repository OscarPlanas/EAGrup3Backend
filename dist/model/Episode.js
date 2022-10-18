"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Episode = new mongoose_1.Schema({
    serie: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Series"
    },
    // id_serie: Number,
    name: String,
    air_date: Date,
    season_number: Number,
    episode_number: Number,
});
exports.default = (0, mongoose_1.model)('Episode', Episode);
//# sourceMappingURL=Episode.js.map