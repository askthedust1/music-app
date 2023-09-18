import express from "express";
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";
import Track from "../models/Track";
import Album from "../models/Album";
import Artist from "../models/Artist";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res) => {
    const user = (req as RequestWithUser).user;
    try {
        const result = await TrackHistory.find({'user': user._id})
            .sort({datetime: -1})
            .populate({path: 'track', select: 'name'})
            .populate({path: 'artist', select: 'name'});
        return res.send(result);
    } catch (e) {
        return res.sendStatus(500);
    }

});

trackHistoryRouter.post('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const result = await Track.find({'_id': req.body.track});
        const album = await Album.find({'_id': result[0].album});
        const artist = await Artist.find({'_id': album[0].artist});
        if (!artist) {
            return res.sendStatus(404);
        } else {
            const history = new TrackHistory({
                track: req.body.track,
                user: user._id,
                artist: artist[0]._id,
                datetime: new Date().toISOString(),
            });
            await history.save();
            return res.send(history);
        }
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }

});

export default trackHistoryRouter;