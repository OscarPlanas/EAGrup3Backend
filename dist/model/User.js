"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    name: String,
    password: String,
    email: String
});
exports.default = (0, mongoose_1.model)('User', User);
//# sourceMappingURL=User.js.map