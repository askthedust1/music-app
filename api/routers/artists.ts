import express from 'express';
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {IArtist} from "../types";
import permit from "../middleware/permit";
import auth from "../middleware/auth";
import Album from "../models/Album";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import config from "../config";
import fs from "fs";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try {
        const result = await Artist.find({isPublished: true});
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});

artistsRouter.get('/admin', auth, permit('admin'), async (req, res) => {
    try {
        const result = await Artist.find();
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});


artistsRouter.post('/', auth, permit('admin', 'user'), imagesUpload.single('image'), async (req, res, next) => {
    const artistData: IArtist = {
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    };

    const artist = new Artist(artistData);

    try {
        await artist.save();
        return res.send(artist);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);

    }

});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;
        const artist = await Artist.findById(id);

        if (!artist) {
            return res.status(404).send('Not found!');
        }

        const toggle = await Artist.findOneAndUpdate({_id: id}, {isPublished: !artist.isPublished});

        return res.send(toggle);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);

    }

});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;
        const artist = await Artist.findById(id);

        if (!artist) {
            return res.status(404).send('Not Found!');
        }

        const albums = await Album.find({'artist': id});

        for (const album of albums) {
            await Track.deleteMany({'album': album._id});
        }

        await TrackHistory.deleteMany({'artist': id});
        await Album.deleteMany({'artist': id});
        await Artist.findByIdAndRemove(id);

        const filePath = config.publicPath + '/' + artist.image;
        fs.unlinkSync(filePath);

        res.send('Deleted');
    } catch (e) {
        res.status(500).send('error');
    }
});

export default artistsRouter;