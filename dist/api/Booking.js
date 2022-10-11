"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingController_1 = __importDefault(require("../controller/bookingController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/booking', bookingController_1.default.booking);
router.post('/cancel', bookingController_1.default.cancel);
router.get('/', bookingController_1.default.getall);
exports.default = router;
//# sourceMappingURL=Booking.js.map