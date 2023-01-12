import reportController from '../controller/reportController';
import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken, isModerator } from '../middlewares/authJWT'

const router = Router();

router.get('/', reportController.getReports);
router.get('/:id_report', reportController.getReport);
router.post('/:id', reportController.addReport);

export default router;