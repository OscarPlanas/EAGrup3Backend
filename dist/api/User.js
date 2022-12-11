"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controller/userController"));
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authJWT_1 = require("../middlewares/authJWT");
const router = (0, express_1.Router)();
router.post('/register', (0, express_validator_1.body)('password').isLength({ min: 6 }), (0, express_validator_1.body)('email').isEmail(), userController_1.default.register);
//router.post('/login', userController.login);
router.get('/profile/:id', userController_1.default.profile);
router.post('/:id/avatar', userController_1.default.addAvatar);
router.get('/', userController_1.default.getall);
router.delete('/:id', [authJWT_1.verifyToken, authJWT_1.isOwner], userController_1.default.deleteUser);
router.put('/:id', userController_1.default.update);
router.put('/addavatar', userController_1.default.addAvatar);
exports.default = router;
//# sourceMappingURL=User.js.map