import reportController from '../controller/reportController';
import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken, isModerator } from '../middlewares/authJWT'

const router = Router();

router.get('/',[verifyToken, isModerator], reportController.getReports);
router.get('/:id_report',[verifyToken, isModerator], reportController.getReport);
router.post('/:id',[verifyToken], reportController.addReport);
router.delete('/:id',[verifyToken, isModerator], reportController.deleteReport);
export default router;