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
const Series_1 = __importDefault(require("../model/Series"));
const Comment_1 = __importDefault(require("../model/Comment"));
const Episode_1 = __importDefault(require("../model/Episode"));
const getall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.find().populate('comments, episodes');
    res.json(series);
});
const getone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id_serie).populate('comments, episodes');
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    res.json(series);
});
const setone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = new Series_1.default(req.body);
    yield series.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Serie saved' });
    });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Series_1.default.findByIdAndUpdate(req.params.id_serie, req.body, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Serie updated' });
    });
});
const deleteSerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Series_1.default.findByIdAndDelete(req.params.id_serie, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Serie deleted' });
    });
});
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const comment = new Comment_1.default(req.body);
    yield comment.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        series.update({ _id: series._id }, { $push: { comments: comment._id } });
        series.save();
        res.status(200).json({ status: 'Comment saved' });
    });
});
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const comments = yield Comment_1.default.find({ _id: { $in: series.comments } });
    res.json(comments);
});
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const comment = yield Comment_1.default.findById(req.params.id_comment);
    if (!comment) {
        return res.status(404).send('The comment does not exist');
    }
    res.json(comment);
});
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Comment_1.default.findByIdAndUpdate(req.params.id_comment, req.body, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Comment updated' });
    });
});
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const comment = yield Comment_1.default.findById(req.params.id_comment);
    if (!comment) {
        return res.status(404).send('The comment does not exist');
    }
    yield Comment_1.default.findByIdAndDelete(req.params.id_comment, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        series.update({ _id: series._id }, { $pull: { comments: comment._id } });
        series.save();
        res.status(200).json({ status: 'Comment deleted' });
    });
});
const addEpisode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episode = new Episode_1.default(req.body);
    yield episode.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        series.update({ _id: series._id }, { $push: { episodes: episode._id } });
        series.save();
        res.status(200).json({ status: 'Episode saved' });
    });
});
const getEpisodes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episodes = yield Episode_1.default.find({ _id: { $in: series.episodes } });
    res.json(episodes);
});
const getEpisode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episode = yield Episode_1.default.findById(req.params.id_episode);
    if (!episode) {
        return res.status(404).send('The episode does not exist');
    }
    res.json(episode);
});
const updateEpisode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Episode_1.default.findByIdAndUpdate(req.params.id_episode, req.body, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Episode updated' });
    });
});
const deleteEpisode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episode = yield Episode_1.default.findById(req.params.id_episode);
    if (!episode) {
        return res.status(404).send('The episode does not exist');
    }
    yield Episode_1.default.findByIdAndDelete(req.params.id_episode, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        series.update({ _id: series._id }, { $pull: { episodes: episode._id } });
        series.save();
        res.status(200).json({ status: 'Episode deleted' });
    });
});
exports.default = {
    getall,
    getone,
    setone,
    update,
    deleteSerie,
    addComment,
    getComments,
    getComment,
    updateComment,
    deleteComment,
    addEpisode,
    getEpisodes,
    getEpisode,
    updateEpisode,
    deleteEpisode,
};
//# sourceMappingURL=seriesController.js.map