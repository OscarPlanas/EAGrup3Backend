import eventController from '../controller/eventController';
import { Router } from 'express';
import { verifyToken, isOwner } from '../middlewares/authJWT'

const router = Router();

router.get('/', eventController.getall);
//router.get('/',[verifyToken], eventController.getall);

router.get('/:id_event', eventController.getone);
//router.post('/', eventController.setone);
router.put('/:id_event', eventController.update);
router.delete('/:id_event', eventController.deleteEvent);

router.get('/:id_event/comments', eventController.getComments);
router.get('/:id_event/comments/:id_comment', eventController.getComment);
router.post('/:id_event/comments', eventController.addComment);
router.put('/:id_event/comments/:id_comment', eventController.updateComment);
router.delete('/:id_event/comments/:id_comment', eventController.deleteComment);
router.post('/',[verifyToken], eventController.addEvent);

export default router;