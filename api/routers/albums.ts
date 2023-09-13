import express from 'express';
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import Album from "../models/Album";
import {IAlbum, IAlbumNew} from "../types";
import Track from "../models/Track";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        if (req.query.artist) {
            const queryId = req.query.artist as string;
            const albums = await Album.find({'artist': queryId}).populate('artist');

            const newAlbums: IAlbumNew[] = [];

            for (const album of albums) {
                const tracksAmount = await Track.countDocuments({'album': album._id});
                newAlbums.push({ ...album.toObject(), trackAmount: tracksAmount});
            }
            return res.send(newAlbums);
        } else {
            const result = await Album.find();
            return res.send(result);
        }
    } catch {
        return res.sendStatus(500);
    }
});

albumsRouter.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');

        if (!album) {
            return res.sendStatus(404);
        }

        return res.send(album);
    } catch {
        return res.sendStatus(500);
    }
});


albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const albumData: IAlbum = {
        name: req.body.name,
        date: req.body.date,
        image: req.file ? req.file.filename : null,
        artist: req.body.artist,
    };

    const album= new Album(albumData);

    try {
        await album.save();
        return res.send(album);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);

    }

});

export default albumsRouter;