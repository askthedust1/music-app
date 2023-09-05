import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});


    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    try {
        const history = new TrackHistory({
            track: req.body.track,
            user: user._id,
            datetime: new Date().toISOString(),
        })
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