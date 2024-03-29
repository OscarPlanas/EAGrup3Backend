import seriesController from '../controller/seriesController';
import { Router } from 'express';
import { verifyToken, isModerator } from '../middlewares/authJWT'

const router = Router();

//router.get('/', seriesController.getall);
router.get('/', seriesController.getall);

router.get('/:id', seriesController.getone);
router.post('/',[verifyToken, isModerator], seriesController.setone);
router.put('/:id',[verifyToken, isModerator], seriesController.update);
router.delete('/:id',[verifyToken, isModerator], seriesController.deleteSerie);
router.get('/:id/episodes', seriesController.getEpisodes);
router.get('/:id/episodes/:id_episode', seriesController.getEpisode);
router.post('/:id/episodes', seriesController.addEpisode);
router.put('/:id/episodes/:id_episode', seriesController.updateEpisode);
router.delete('/:id/episodes/:id_episode', seriesController.deleteEpisode);
router.get('/:id/comments', seriesController.getComments);
router.get('/:id/comments/:id_comment', seriesController.getComment);
router.post('/addcomment/:serie_id', seriesController.addComment);
router.put('/:id/comments/:id_comment', seriesController.updateComment);
router.delete('/:id/comments/:id_comment', seriesController.deleteComment);

router.post('/:id', seriesController.addGenre);


export default router;