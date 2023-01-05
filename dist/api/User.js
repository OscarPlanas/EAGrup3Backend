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
//router.post('/login', userController.login);
router.get('/profile/:id', userController_1.default.profile);
//router.post('/:id/avatar', userController.addAvatar);
router.get('/', userController_1.default.getall);
//router.get('/', [verifyToken, isModerator], userController.getall);
router.delete('/:id', userController_1.default.deleteUser);
//router.delete('/:id',  [verifyToken, isOwner], userController.deleteUser);
router.put('/:id', userController_1.default.update);
//router.put('/addavatar', userController.addAvatar);
router.put('/addserie/:idUser/:idSerie', userController_1.default.addSerie);
router.put('/delserie/:idUser/:idSerie', userController_1.default.delSerie);
exports.default = router;
//# sourceMappingURL=User.js.map