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
const ITEMS_PER_PAGE = 4;
const getall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.body.page || 0;
        const limit = req.body.limit || 5;
        const search = req.body.search || "";
        let sort = req.body.sort || "title";
        // sort by "field" ascending and "test" descending
        //query.sort('field -test');
        let genres = req.body.genres || ["All"];
        const genreOptions = [
            "Action",
            "Romance",
            "Fantasy",
            "Drama",
            "Crime",
            "Adventure",
            "Thriller",
            "Science-Fiction",
            "Music",
            "Family",
            "Horror",
            "Mystery"
        ];
        genres.includes("All")
            ? (genres = [...genreOptions])
            : (genres = genres);
        // req.params.sort 
        //     ? (sort = req.params.sort.split(",")) 
        //     : (sort = sort);
        // let sortBy = {};
        // if (sort[1] === "asc") {
        // 	sortBy[sort[0]] = "asc";
        // } else {
        // 	sortBy[sort[0]] = "asc";
        // }
        const series = yield Series_1.default.find({
            "$or": [
                { title: { $regex: search, $options: "i" } },
                { overview: { $regex: search, $options: "i" } },
            ]
        })
            .where("genres")
            .in([...genres])
            .sort(sort)
            .skip(page * limit)
            .limit(limit);
        const total = yield Series_1.default.countDocuments({
            genres: { $in: [...genres] },
            "$or": [
                { title: { $regex: search, $options: "i" } },
                { overview: { $regex: search, $options: "i" } },
            ]
        });
        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            series,
        };
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "internal server error" });
    }
    // const page = req.params.page || 1;
    // const series = await Series.find().populate({ path: 'comments', populate: { path: 'user' } });
    // // populate('comments, episodes');
    // res.json(series);
});
const getone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const series = yield Series_1.default.findById(req.params.id).populate('episodes');
    // 'comments, episodes');
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
    try {
        const user = yield Series_1.default.findOneAndDelete({ id: req.params.id }).catch(Error);
        res.status(200).json({ status: 'Serie deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Serie not found', error });
    }
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
    const series = yield Series_1.default.findById(req.params.id);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episode = new Episode_1.default(req.body);
    yield episode.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    series.updateOne({ $push: { episodes: episode._id } }, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
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
const addGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = req.body;
    try {
        const serie = yield Series_1.default.findById(req.params.id);
        if (!serie) {
            return res.status(404).send('Serie does not exist');
        }
        serie.updateOne({ $push: { genres: genre.genres } }, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            serie.save();
            res.status(200).json({ status: 'Genre saved' });
        });
    }
    catch (error) {
        res.status(500).json({ message: 'error unknown', error });
    }
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
    addGenre
};
//# sourceMappingURL=seriesController.js.map