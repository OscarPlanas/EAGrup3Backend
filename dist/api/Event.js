"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventController_1 = __importDefault(require("../controller/eventController"));
const express_1 = require("express");
const authJWT_1 = require("../middlewares/authJWT");
const router = (0, express_1.Router)();
//router.get('/', eventController.getall);
router.get('/', eventController_1.default.getall);
router.get('/:id_event', eventController_1.default.getone);
//router.post('/', eventController.setone);
router.put('/:id', eventController_1.default.update);
router.delete('/:id', eventController_1.default.deleteEvent);
router.post('/:id_event/join', eventController_1.default.addParticipant);
router.get('/:id_event/comments', eventController_1.default.getComments);
router.get('/:id_event/comments/:id_comment', eventController_1.default.getComment);
router.post('/:id_event/comments', eventController_1.default.addComment);
router.put('/:id_event/comments/:id_comment', eventController_1.default.updateComment);
router.delete('/:id_event/comments/:id_comment', eventController_1.default.deleteComment);
router.post('/', [authJWT_1.verifyToken], eventController_1.default.addEvent);
exports.default = router;
//# sourceMappingURL=Event.js.map