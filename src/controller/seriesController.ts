import Series from '../model/Series';
import Comment from '../model/Comment';
import Episode from '../model/Episode';
import { Request, Response } from 'express';

const ITEMS_PER_PAGE = 4;

const getall = async (req: Request, res: Response) => {
    try{
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


		const series = await Series.find(
            { 
                "$or":[
                    {title: { $regex: search, $options: "i" } },
                    {overview: { $regex: search, $options: "i" } },

                ]})
			.where("genres")
			.in([...genres])
			.sort(sort)
			.skip(page * limit)
			.limit(limit);

		const total = await Series.countDocuments({
			genres: { $in: [...genres] },
			"$or":[
                {title: { $regex: search, $options: "i" } },
                {overview: { $regex: search, $options: "i" } },

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

    }catch (err) {
        console.log(err);
        res.status(500).json({error:true, message:"internal server error"});
    }
    // const page = req.params.page || 1;

    // const series = await Series.find().populate({ path: 'comments', populate: { path: 'user' } });

    // // populate('comments, episodes');
    // res.json(series);
};

const getone = async (req: Request, res: Response) => {
    const series = await Series.findById(req.params.id).populate('episodes');


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
    const series = await Series.findById(req.params.id);
    if (!series) {
        return res.status(404).send('The series does not exist');
    }
    const episode = new Episode(req.body);
    await episode.save( (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
	});
	series.updateOne({ $push: { episodes: episode._id } }, (err: any) => {
		if (err) {
			return res.status(500).send(err);
		}
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

const addGenre = async (req: Request, res: Response) => {
    
    const genre = req.body;
	try {
        const serie = await Series.findById(req.params.id);
		if (!serie) {
			return res.status(404).send('Serie does not exist');
		}
		serie.updateOne({ $push: { genres: genre.genres } }, (err: any) => {
            if (err) {
                return res.status(500).send(err);
            }
            serie.save();
            res.status(200).json({ status: 'Genre saved' });
        });

	}catch (error) {
		res.status(500).json({message: 'error unknown', error });
	}
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
    addGenre
};