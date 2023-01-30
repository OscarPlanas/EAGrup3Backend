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
const Series_1 = __importDefault(require("../model/Series"));
const Comment_1 = __importDefault(require("../model/Comment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const secretoJWT = 'NuestraClaveEA3';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const username = req.body.username;
    const birthdate = req.body.birthdate;
    const email = req.body.email;
    let password = req.body.password;
    password = crypto_js_1.default.AES.encrypt(password, 'groupEA2022').toString();
    const newUser = new User_1.default({ name, username, email, password, birthdate, isAdmin: false });
    yield newUser.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    const session = { id: username };
    const token = jsonwebtoken_1.default.sign({ id: newUser._id }, secretoJWT, {
        expiresIn: 60 * 60 * 24
    });
    res.status(200).json({ auth: true, token, id: newUser._id });
});
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id, { password: 0 }).populate('serie').populate('event').populate({ path: 'comment', populate: { path: 'owner' } });
    if (!user) {
        return res.status(404).send('No user found.');
    }
    res.status(200).json(user);
});
const getall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find().populate('serie');
    res.status(200).json(users);
});
const getone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username: req.params.username }).populate('serie');
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
        const isAdmin = req.body.isAdmin;
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, {
            name, username, birthdate, email, isAdmin
        }, { new: true });
        res.json(user).status(200);
    }
    catch (error) {
        res.status(401).send(error);
    }
});
/*const addAvatar = async (req: Request, res: Response) => {
    const { idUser, avatar } = req.body;
    try {
        
        const user = await User.findById(idUser);
        //const avatar = req.body.avatar;
        if (!user) {
            return res.status(404).send('No user or serie found.');
        }
        
         
        await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { avatar: avatar } });

        res.status(200).json({ status: 'Avatar added', avatar });
        

    }catch (error) {
        res.status(500).json({message: 'error unknown', error });
    }

}*/
const addSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.idUser);
    if (!user) {
        return res.status(404).send('The user does not exist');
    }
    const serie = yield Series_1.default.findById(req.params.idSerie);
    if (!serie) {
        return res.status(404).send('The series does not exist');
    }
    user.updateOne({ $push: { serie: serie._id } }, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        user.save();
        res.status(200).json({ status: 'Serie saved' });
    });
});
const delSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.idUser);
    if (!user) {
        return res.status(404).send('The user does not exist');
    }
    const serie = yield Series_1.default.findById(req.params.idSerie);
    if (!serie) {
        return res.status(404).send('The series does not exist');
    }
    user.updateOne({ $pull: { serie: serie._id } }, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        user.save();
        res.status(200).json({ status: 'Serie deleted' });
    });
});
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.idUser);
    if (!user) {
        return res.status(404).send('The user does not exist');
    }
    const comment = new Comment_1.default(req.body);
    yield comment.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    user.updateOne({ $push: { comment: comment._id } }, (err) => {
        user.save();
        res.status(200).json({ status: 'Comment saved' });
    });
});
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id);
    // Get the file that was set to our field named "image"
    const { image } = req.files;
    // If no image submitted, exit
    if (!image)
        return res.sendStatus(400);
    // Move the uploaded image to our upload folder
    const ext = image.name.split('.').pop();
    console.log(process.env.PATH);
    image.mv('./src/upload/profile/' + (user === null || user === void 0 ? void 0 : user._id) + '.' + ext);
    // console.log(ext);
    // console.log(__dirname + '/upload/profile/' + image.name);
    // console.log(req.files);
    res.sendStatus(200);
});
exports.default = {
    register,
    profile,
    getall,
    getone,
    deleteUser,
    update,
    addSerie,
    delSerie,
    addComment,
    uploadAvatar
};
//# sourceMappingURL=userController.js.map