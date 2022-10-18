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
    /*const name = req.body.name;
    const userID = req.body.user;
    const findbooking = await Booking.findOne({ name, user: userID });
    if (!findbooking) {
        return res.status(400).json({ message: 'Booking not found' });
    }
    await Booking.findByIdAndDelete(findbooking.id);
    res.status(200).json({ auth: true });*/
    try {
        const book = yield Booking_1.default.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Booking not found');
        }
        yield Booking_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'Booking deleted' });
    }
    catch (error) {
        res.status(500).send(error);
    }
    // const book = await Booking.findById(req.params.id);
    // const name = req.body.name;
    // const id = req.body.user;
    // const find = await Booking.findOne({id: book.id});
    /*if (!book) {
        return res.status(400).json({ message: 'Booking not found' });
    }
    const user = await Booking.findByIdAndRemove(book.id);
    return res.json({
      message: "Booking deleted",
      user
    });*/
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