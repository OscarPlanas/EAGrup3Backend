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
const Episode_1 = __importDefault(require("../model/Episode"));
const getall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const episodes = yield Episode_1.default.find();
    res.json(episodes);
});
const getone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const episode = yield Episode_1.default.findById(req.params.id_episode);
    if (!episode) {
        return res.status(404).send('The episode does not exist');
    }
    res.json(episode);
});
const setone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const episode = new Episode_1.default(req.body);
    yield episode.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Episode saved' });
    });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Episode_1.default.findByIdAndUpdate(req.params.id_episode, req.body, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Episode updated' });
    });
});
const deleteEpisode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Episode_1.default.findByIdAndDelete(req.params.id_episode, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Episode deleted' });
    });
});
exports.default = {
    getall,
    getone,
    setone,
    update,
    deleteEpisode
};
//# sourceMappingURL=episodesController.js.map