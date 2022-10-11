"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Comment = new mongoose_1.Schema({
    content: String,
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: Number,
});
exports.default = (0, mongoose_1.model)('Comment', Comment);
//# sourceMappingURL=Comment.js.map