import userController from '../controller/userController';
import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken, isModerator } from '../middlewares/authJWT'

const router = Router();

router.post('/register', body('password').isLength({ min: 6 }), body('email').isEmail(), userController.register);
router.get('/profile/:id', userController.profile);
router.get('/', userController.getall);
router.get('/:username', userController.getone);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.update);
router.put('/addserie/:idUser/:idSerie', userController.addSerie);
router.put('/delserie/:idUser/:idSerie', userController.delSerie);
router.put('/addcomment/:idUser', userController.addComment);
router.post('/profile/:id/upload', userController.uploadAvatar);
export default router;