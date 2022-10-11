"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Booking_1 = __importDefault(require("../model/Booking"));
const User_1 = __importDefault(require("../model/User"));
const booking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const name = req.body.name;
    const user1 = yield User_1.default.findOne({ name: user });
    if (!user1) {
        return res.status(400).json({ message: 'User not found' });
    }
    const newBooking = new Booking_1.default({
        name,
        user: user1._id
    });
    yield newBooking.save();
    res.status(200).json({ auth: true });
});
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const userID = req.body.user;
    const findbooking = yield Booking_1.default.findOne({ name, user: userID });
    if (!findbooking) {
        return res.status(400).json({ message: 'Booking not found' });
    }
    yield Booking_1.default.findByIdAndDelete(findbooking._id);
    res.status(200).json({ auth: true });
});
const getall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield Booking_1.default.find().populate('user');
    res.json(bookings);
});
exports.default = {
    booking,
    cancel,
    getall
};
//# sourceMappingURL=bookingController.js.map