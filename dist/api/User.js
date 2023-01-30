"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controller/userController"));
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/register', (0, express_validator_1.body)('password').isLength({ min: 6 }), (0, express_validator_1.body)('email').isEmail(), userController_1.default.register);
router.get('/profile/:id', userController_1.default.profile);
router.get('/', userController_1.default.getall);
router.get('/:username', userController_1.default.getone);
router.delete('/:id', userController_1.default.deleteUser);
router.put('/:id', userController_1.default.update);
router.put('/addserie/:idUser/:idSerie', userController_1.default.addSerie);
router.put('/delserie/:idUser/:idSerie', userController_1.default.delSerie);
router.put('/addcomment/:idUser', userController_1.default.addComment);
router.post('/profile/:id/upload', userController_1.default.uploadAvatar);
exports.default = router;
//# sourceMappingURL=User.js.map