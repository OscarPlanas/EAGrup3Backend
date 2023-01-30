import userController from '../controller/userController';
import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken, isModerator } from '../middlewares/authJWT'

const router = Router();

router.post('/register', body('password').isLength({ min: 6 }), body('email').isEmail(), userController.register);
router.get('/profile/:id', userController.profile);
router.get('/', [verifyToken, isModerator], userController.getall);
router.get('/:username', userController.getone);
router.delete('/:id',[verifyToken], userController.deleteUser);
router.put('/:id',[verifyToken], userController.update);
router.put('/addserie/:idUser/:idSerie',[verifyToken], userController.addSerie);
router.put('/delserie/:idUser/:idSerie',[verifyToken], userController.delSerie);
router.put('/addcomment/:idUser',[verifyToken], userController.addComment);
router.post('/profile/:id/upload',[verifyToken], userController.uploadAvatar);
export default router;