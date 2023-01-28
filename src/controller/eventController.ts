import Event from '../model/Event';
import Comment from '../model/Comment';
import User from '../model/User';

import { Request, Response } from 'express';

const getall = async (req: Request, res: Response) => {
    const events = await Event.find().populate('owner').populate('participants').populate({
		path: 'comments',
		populate: { path: 'owner' }
	});
    res.json(events);
}

const getone = async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id_event).populate('participants').populate({
		path: 'comments',
		populate: { path: 'owner' }
	});
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    res.json(event);

    
}

const setone = async (req: Request, res: Response) => {
    const event = new Event(req.body);
    await event.save( (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Event saved' });
    });
}

const update = async (req: Request, res: Response) => {
    try{
		const title = req.body.title;
		const description = req.body.description;
		const event = await Event.findByIdAndUpdate(req.params.id, {
			title, description
		}, {new: true});
		res.json(event).status(200);
	}catch (error) {
		res.status(401).send(error);
	}

}

const deleteEvent = async (req: Request, res: Response) => {
    try {
		await Event.findByIdAndRemove(req.params.id);
		res.status(200).json({ status: 'Event deleted' });
	}
	catch (error) {
		res.status(500).json({message: 'Event not found', error });
	}
}

const addComment = async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id_event);
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    const comment = new Comment(req.body);
    await comment.save( (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
	event.updateOne({ $push: { comments: comment._id } }, (err: any) => {
		event.save();
		res.status(200).json({ status: 'Comment saved' });
	});
}

const addParticipant = async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id_event);
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    const participant = await User.findById(req.body.id);
	if (event.participants.includes(participant?._id!)) {
		return res.status(404).send('The user is already a participant');
	}
    event.updateOne({ $push: { participants: participant?._id } }, (err: any) => {
		event.save();
		res.status(200).json({ status: 'Participant saved' });
	});
}

const getComments = async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id_event).populate('comments');
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    res.json(event.comments);
}

const getComment = async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id_event).populate('comments');
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    const comment = await Comment.findById(req.params.id_comment);
    if (!comment) {
        return res.status(404).send('The comment does not exist');
    }
    res.json(comment);
}

const updateComment = async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id_event);
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    await Comment.findByIdAndUpdate(req.params.id_comment, req.body, (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Comment updated' });
    });
}

const deleteComment = async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id_event);
    if (!event) {
        return res.status(404).send('The event does not exist');
    }
    const comment = await Comment.findById(req.params.id_comment);
    if (!comment) {
        return res.status(404).send('The comment does not exist');
    }
    await Comment.findByIdAndDelete(req.params.id_comment, (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        event.update(
            { _id: event._id },
            { $pull: { comments: comment._id } },
        );
        event.save();
        res.status(200).json({ status: 'Comment deleted' });
    });
}
const addEvent = async (req: Request, res: Response) => {
    const event = new Event(req.body);
    await event.save( (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
};

export default {
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
}