import bookingController from '../controller/bookingController';
import { Router } from 'express';
import { verifyToken, isOwner } from '../middlewares/authJWT'

const router = Router();

router.post('/booking', bookingController.booking);
router.delete('/cancel/:id', bookingController.cancel);
router.get('/', [verifyToken], bookingController.getall);

export default router;