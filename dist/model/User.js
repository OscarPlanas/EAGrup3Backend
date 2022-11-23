"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    name: String,
    username: String,
    password: String,
    birthdate: Date,
    email: String
    /*id: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true},
  username: { type: String, required: true},*/
});
exports.default = (0, mongoose_1.model)('User', User);
//# sourceMappingURL=User.js.map