"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seriesController_1 = __importDefault(require("../controller/seriesController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', seriesController_1.default.getall);
router.get('/:id', seriesController_1.default.getone);
router.post('/', seriesController_1.default.setone);
router.put('/:id', seriesController_1.default.update);
router.delete('/:id', seriesController_1.default.deleteSerie);
router.get('/:id/episodes', seriesController_1.default.getEpisodes);
router.get('/:id/episodes/:id_episode', seriesController_1.default.getEpisode);
router.post('/:id/episodes', seriesController_1.default.addEpisode);
router.put('/:id/episodes/:id_episode', seriesController_1.default.updateEpisode);
router.delete('/:id/episodes/:id_episode', seriesController_1.default.deleteEpisode);
router.get('/:id/comments', seriesController_1.default.getComments);
router.get('/:id/comments/:id_comment', seriesController_1.default.getComment);
router.post('/:id/comments', seriesController_1.default.addComment);
router.put('/:id/comments/:id_comment', seriesController_1.default.updateComment);
router.delete('/:id/comments/:id_comment', seriesController_1.default.deleteComment);
exports.default = router;
//# sourceMappingURL=Series.js.map