"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Booking = new mongoose_1.Schema({
    name: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
});
exports.default = (0, mongoose_1.model)('Booking', Booking);
//# sourceMappingURL=Booking.js.map