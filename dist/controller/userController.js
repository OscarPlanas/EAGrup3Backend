"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    let password = req.body.password;
    password = crypto_js_1.default.AES.encrypt(password, 'groupEA2022').toString();
    const newUser = new User_1.default({ name, email, password });
    yield newUser.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    const token = jsonwebtoken_1.default.sign({ id: newUser._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
        expiresIn: 60 * 60 * 24
    });
    res.status(200).json({ auth: true, token });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send('The email does not exist');
    }
    const validPassword = crypto_js_1.default.AES.decrypt(user.password, 'groupEA2022').toString(crypto_js_1.default.enc.Utf8);
    if (!validPassword) {
        return res.status(401).json({ auth: false, token: null });
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
        expiresIn: 60 * 60 * 24
    });
    res.status(200).json({ auth: true, token });
});
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id, { password: 0 });
    if (!user) {
        return res.status(404).send('No user found.');
    }
    res.status(200).json(user);
});
const getall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    res.status(200).json(users);
});
const getone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id);
    res.json(user);
});
/*const deleteUser = async (req: Request, res: Response) => {
    await User.findByIdAndDelete(req.params.id, (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'User deleted' });
    });
};*/
exports.default = {
    register,
    login,
    profile,
    getall,
    getone
    // deleteUser
};
//# sourceMappingURL=userController.js.map