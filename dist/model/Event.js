"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Event = new mongoose_1.Schema({
    title: String,
    image: String,
    description: String,
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    date: Date,
    location: String,
    participants: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    comments: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    vote_average: { type: Number, min: 0, max: 10, default: 0 },
    vote_count: { type: Number, min: 0, default: 0 },
});
exports.default = (0, mongoose_1.model)('Event', Event);
//# sourceMappingURL=Event.js.map