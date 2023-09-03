import express from 'express';
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try {
        const result = await Artist.find();
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});


artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const artistData = {
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    }

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

export default artistsRouter;