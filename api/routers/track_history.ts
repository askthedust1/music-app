import express from "express";
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const result = await TrackHistory.find({'user': user._id})
            .sort({datetime: -1})
            .populate({
                path: 'track',
                model: 'Track',
                select: 'name',
                populate: {
                    path: 'album',
                    model: 'Album',
                    select: 'album',
                    populate: {
                        path: 'artist',
                        model: 'Artist',
                        select: 'name',
                    }
                }
            })
        return res.send(result);
    } catch (e) {
        return res.sendStatus(500);
    }

});

trackHistoryRouter.post('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const history = new TrackHistory({
            track: req.body.track,
            user: user._id,
            datetime: new Date().toISOString(),
        });
        await history.save();
        return res.send(history);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }

});

export default trackHistoryRouter;