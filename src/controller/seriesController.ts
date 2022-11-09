import Series from '../model/Series';
import Comment from '../model/Comment';
import Episode from '../model/Episode';
import { Request, Response } from 'express';

const getall = async (req: Request, res: Response) => {
    const series = await Series.find().populate({ path: 'comments', populate: { path: 'user' } });

    // populate('comments, episodes');
    res.json(series);
};

const getone = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id).populate({ path: 'comments', populate: { path: 'user' } });


        // 'comments, episodes');
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    res.json(series);
};

const setone = async (req: Request, res: Response) => {
    const series = new Series(req.body);
    await series.save( (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Serie saved' });
    });
};

const update = async (req: Request, res: Response) => {
    await Series.findByIdAndUpdate(req.params.id_serie, req.body, (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Serie updated' });
    });
};

const deleteSerie = async (req: Request, res: Response) => {
    try {
		const user = await Series.findOneAndDelete({ id: req.params.id}).catch(Error);
		res.status(200).json({ status: 'Serie deleted' });
	}
	catch (error) {
		res.status(500).json({message: 'Serie not found', error });
	}
};

const addComment = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const comment = new Comment(req.body);
    await comment.save( (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        series.update(
            { _id: series._id },
            { $push: { comments: comment._id } },
        );
        series.save();
        res.status(200).json({ status: 'Comment saved' });
    });
};

const getComments = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const comments = await Comment.find({ _id: { $in: series.comments } });
    res.json(comments);
};

const getComment = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const comment = await Comment.findById(req.params.id_comment);
    if (!comment) {
        return res.status(404).send('The comment does not exist');
    }
    res.json(comment);
};

const updateComment = async (req: Request, res: Response) => {
    await Comment.findByIdAndUpdate(req.params.id_comment, req.body, (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Comment updated' });
    });
};

const deleteComment = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const comment = await Comment.findById(req.params.id_comment);
    if (!comment) {
        return res.status(404).send('The comment does not exist');
    }
    await Comment.findByIdAndDelete(req.params.id_comment, (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        series.update(
            { _id: series._id },
            { $pull: { comments: comment._id } },
        );
        series.save();
        res.status(200).json({ status: 'Comment deleted' });
    });
};

const addEpisode = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episode = new Episode(req.body);
    await episode.save( (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        series.update(
            { _id: series._id },
            { $push: { episodes: episode._id } },
        );
        series.save();
        res.status(200).json({ status: 'Episode saved' });
    });
};

const getEpisodes = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episodes = await Episode.find({ _id: { $in: series.episodes } });
    res.json(episodes);
};

const getEpisode = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episode = await Episode.findById(req.params.id_episode);
    if (!episode) {
        return res.status(404).send('The episode does not exist');
    }
    res.json(episode);
};

const updateEpisode = async (req: Request, res: Response) => {
    await Episode.findByIdAndUpdate(req.params.id_episode, req.body, (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Episode updated' });
    });
};

const deleteEpisode = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id_serie);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episode = await Episode.findById(req.params.id_episode);
    if (!episode) {
        return res.status(404).send('The episode does not exist');
    }
    await Episode.findByIdAndDelete(req.params.id_episode, (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        series.update(
            { _id: series._id },
            { $pull: { episodes: episode._id } },
        );
        series.save();
        res.status(200).json({ status: 'Episode deleted' });
    });
};

export default {
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