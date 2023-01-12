import userController from '../controller/userController';
import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken, isModerator } from '../middlewares/authJWT'


const router = Router();

router.post('/register', body('password').isLength({ min: 6 }), body('email').isEmail(), userController.register);
//router.post('/login', userController.login);
router.get('/profile/:id', userController.profile);
//router.post('/:id/avatar', userController.addAvatar);
router.get('/', userController.getall);
router.get('/:username', userController.getone);
//router.get('/', [verifyToken, isModerator], userController.getall);

router.delete('/:id', userController.deleteUser);
//router.delete('/:id',  [verifyToken, isOwner], userController.deleteUser);

router.put('/:id', userController.update);
//router.put('/addavatar', userController.addAvatar);
router.put('/addserie/:idUser/:idSerie', userController.addSerie);
router.put('/delserie/:idUser/:idSerie', userController.delSerie);
export default router;