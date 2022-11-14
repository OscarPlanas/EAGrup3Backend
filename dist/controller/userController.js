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
    const username = req.body.username;
    const birthdate = req.body.birthdate;
    const email = req.body.email;
    let password = req.body.password;
    password = crypto_js_1.default.AES.encrypt(password, 'groupEA2022').toString();
    const newUser = new User_1.default({ name, username, email, password, birthdate });
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
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('The email does not exist');
        }
        const validPassword = crypto_js_1.default.AES.decrypt(user.password.toString(), 'groupEA2022').toString(crypto_js_1.default.enc.Utf8);
        // const validPassword = CryptoJS.AES.decrypt(user.password, 'groupEA2022').toString(CryptoJS.enc.Utf8);
        if (validPassword !== req.body.password) {
            return res.status(402).json({ auth: false, token: null });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, 'yyt#KInN7Q9X3m&$ydtbZ7Z4fJiEtA6uHIFzvc@347SGHAjV4E', {
            expiresIn: 60 * 60 * 24
        });
        res.status(201).json({ auth: true, token });
    }
    catch (error) {
        res.status(401).send('User not found');
    }
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
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({ status: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'error unknown', error });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const username = req.body.username;
        const birthdate = req.body.birthdate;
        const email = req.body.email;
        const user = yield User_1.default.findByIdAndUpdate(req.body._id, {
            name, username, birthdate, email
        }, { new: true });
        res.json(user).status(200);
    }
    catch (error) {
        res.status(401).send(error);
    }
});
exports.default = {
    register,
    login,
    profile,
    getall,
    getone,
    deleteUser,
    update
};
//# sourceMappingURL=userController.js.map