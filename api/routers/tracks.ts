import express from 'express';
import mongoose from "mongoose";
import Track from "../models/Track";
import {ITrack} from "../types";
import Album from "../models/Album";
import permit from "../middleware/permit";
import auth from "../middleware/auth";
import albumsRouter from "./albums";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        if (req.query.album) {
            const queryId = req.query.album as string;
            const result = await Track.find({$and: [{'album': queryId}, {'isPublished': true}]}).sort({number: 1});
            const artist = await Album.findById({'_id': result[0].album._id}).populate('artist');
            return res.send({ result, artist});
        } else {
            const result = await Track.find();
            return res.send(result);
        }
    } catch {
        return res.sendStatus(500);
    }
});

tracksRouter.get('/admin', auth, permit('admin'), async (req, res) => {
    try {
        const result = await Track.find().populate({path: 'album', select: 'name'});
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});


tracksRouter.post('/', auth, permit('admin', 'user'), async (req, res, next) => {
    const trackData: ITrack = {
        name: req.body.name,
        album: req.body.album,
        time: req.body.time,
        number: req.body.number
    };

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

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;
        const track = await Track.findById(id);

        if (!track) {
            return res.status(404).send('Not found!');
        }

        const toggle = await Track.findOneAndUpdate({_id: id}, {isPublished: !track.isPublished});

        return res.send(toggle);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);

    }

});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;
        const track = await Track.findById(id);

        if (!track) {
            return res.status(404).send('Not Found!');
        }

        // if (user._id.toString() !== artist.user.toString()) {
        //     return res.status(403).send('Error!');
        // }

        await Track.findByIdAndRemove(id);

        res.send('Deleted');
    } catch (e) {
        res.status(500).send('error');
    }
});

export default tracksRouter;