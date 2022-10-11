"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const episodesController_1 = __importDefault(require("../controller/episodesController"));
const seriesController_1 = __importDefault(require("../controller/seriesController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', seriesController_1.default.getall);
router.get('/:id', seriesController_1.default.getone);
router.post('/', seriesController_1.default.setone);
router.get('/:id/episodes', episodesController_1.default.getall);
router.get('/:id/episodes/:id_episode', episodesController_1.default.getone);
router.post('/:id/episodes', episodesController_1.default.setone);
router.put('/:id/episodes/:id_episode', episodesController_1.default.update);
router.delete('/:id/episodes/:id_episode', episodesController_1.default.deleteEpisode);
exports.default = router;
//# sourceMappingURL=Series.js.map