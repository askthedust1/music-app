import express from 'express';
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import Track from "../models/Track";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        if (req.query.album) {
            const queryId = req.query.album as string;
            const result = await Track.find({'album': queryId});
            return res.send(result);
        } else {
            const result = await Track.find();
            return res.send(result);
        }
    } catch {
        return res.sendStatus(500);
    }
});


tracksRouter.post('/', async (req, res, next) => {
    const trackData = {
        name: req.body.name,
        time: req.body.time,
        album: req.body.album,
    }


    const track = new Track(trackData);

    try {
        await track.save();
        return res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);

    }

});

export default tracksRouter;