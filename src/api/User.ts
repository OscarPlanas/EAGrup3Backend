import userController from '../controller/userController';
import { Router } from 'express';
import { body } from 'express-validator';

const router = Router();

router.post('/register', body('password').isLength({ min: 6 }), body('email').isEmail(), userController.register);
router.post('/login', userController.login);
router.get('/profile/:id', userController.profile);
router.get('/', userController.getall);
router.delete('/:id', userController.deleteUser);
router.put('/', userController.update);

export default router;