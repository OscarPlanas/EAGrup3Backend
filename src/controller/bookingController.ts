import Booking from '../model/Booking';
import User from '../model/User';
import { Request, Response } from 'express';

const booking = async (req: Request, res: Response) => {
	const user = req.body.user;
	const name = req.body.name;
	const user1 = await User.findOne({ name: user });
	if (!user1) {
		return res.status(400).json({ message: 'User not found' });
	}
	const newBooking = new Booking({
		name,
		user: user1._id
	});
	await newBooking.save();
	res.status(200).json({ auth: true });
};

const cancel = async (req: Request, res: Response) => {
	/*const name = req.body.name;
	const userID = req.body.user;
	const findbooking = await Booking.findOne({ name, user: userID });
	if (!findbooking) {
		return res.status(400).json({ message: 'Booking not found' });
	}
	await Booking.findByIdAndDelete(findbooking.id);
	res.status(200).json({ auth: true });*/
	try {
		const book = await Booking.findById(req.params.id);
		if (!book) {
			return res.status(404).send('Booking not found');
		}
		await Booking.findByIdAndDelete(req.params.id);
		res.status(200).json({ status: 'Booking deleted' });
	} catch (error) {
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
};

const getall = async (req: Request, res: Response) => {
	const bookings = await Booking.find().populate('user');
	res.json(bookings);
};

export default {
	booking,
	cancel,
	getall
};