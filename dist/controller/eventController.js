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
const Event_1 = __importDefault(require("../model/Event"));
const Comment_1 = __importDefault(require("../model/Comment"));
const User_1 = __importDefault(require("../model/User"));
const getall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield Event_1.default.find().populate('owner').populate('participants').populate({
        path: 'comments',
        populate: { path: 'owner' }
    });
    res.json(events);
});
const getone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event_1.default.findById(req.params.id_event).populate('participants').populate({
        path: 'comments',
        populate: { path: 'owner' }
    });
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    res.json(event);
});
const setone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = new Event_1.default(req.body);
    yield event.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Event saved' });
    });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Event_1.default.findByIdAndUpdate(req.params.id_event, req.body, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Event updated' });
    });
});
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Event_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({ status: 'Event deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Event not found', error });
    }
});
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event_1.default.findById(req.params.id_event);
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    const comment = new Comment_1.default(req.body);
    yield comment.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    event.updateOne({ $push: { comments: comment._id } }, (err) => {
        event.save();
        res.status(200).json({ status: 'Comment saved' });
    });
});
const addParticipant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event_1.default.findById(req.params.id_event);
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    const participant = yield User_1.default.findById(req.body.id);
    if (event.participants.includes(participant === null || participant === void 0 ? void 0 : participant._id)) {
        return res.status(404).send('The user is already a participant');
    }
    event.updateOne({ $push: { participants: participant === null || participant === void 0 ? void 0 : participant._id } }, (err) => {
        event.save();
        res.status(200).json({ status: 'Participant saved' });
    });
});
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event_1.default.findById(req.params.id_event).populate('comments');
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    res.json(event.comments);
});
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event_1.default.findById(req.params.id_event).populate('comments');
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    const comment = yield Comment_1.default.findById(req.params.id_comment);
    if (!comment) {
        return res.status(404).send('The comment does not exist');
    }
    res.json(comment);
});
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event_1.default.findById(req.params.id_event);
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    yield Comment_1.default.findByIdAndUpdate(req.params.id_comment, req.body, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Comment updated' });
    });
});
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event_1.default.findById(req.params.id_event);
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    const comment = yield Comment_1.default.findById(req.params.id_comment);
    if (!comment) {
        return res.status(404).send('The comment does not exist');
    }
    yield Comment_1.default.findByIdAndDelete(req.params.id_comment, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        event.update({ _id: event._id }, { $pull: { comments: comment._id } });
        event.save();
        res.status(200).json({ status: 'Comment deleted' });
    });
});
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = new Event_1.default(req.body);
    yield event.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
});
exports.default = {
    getall,
    getone,
    setone,
    update,
    deleteEvent,
    addComment,
    getComments,
    getComment,
    updateComment,
    deleteComment,
    addEvent,
    addParticipant
};
//# sourceMappingURL=eventController.js.map