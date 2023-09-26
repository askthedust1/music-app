import express from 'express';
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {IArtist} from "../types";
import permit from "../middleware/permit";
import auth, {RequestWithUser} from "../middleware/auth";
import config from "../config";
import fs from 'fs';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
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

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const id = req.params.id;
        const artist = await Artist.findById(id);

        if (!artist) {
            return res.status(404).send('Not Found!');
        }

        // if (user._id.toString() !== artist.user.toString()) {
        //     return res.status(403).send('Error!');
        // }

        await Artist.findByIdAndRemove(id);
        const filePath = config.publicPath + '/' + artist.image;
        fs.unlinkSync(filePath);

        res.send('Deleted');
    } catch (e) {
        res.status(500).send('error');
    }
});

export default artistsRouter;