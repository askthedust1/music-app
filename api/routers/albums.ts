import express from 'express';
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import Album from "../models/Album";
import {IAlbum, IAlbumNew} from "../types";
import Track from "../models/Track";
import Artist from "../models/Artist";
import permit from "../middleware/permit";
import auth, {RequestWithUser} from "../middleware/auth";
import config from "../config";
import fs from "fs";
import artistsRouter from "./artists";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        if (req.query.artist) {
            const queryId = req.query.artist as string;
            const albums = await Album.find({$and: [{'artist': queryId}, {'isPublished': true}]}).sort({date: -1});
            const artist = await Artist.findById(queryId).select('name');

            const newAlbums: IAlbumNew[] = [];

            for (const album of albums) {
                const tracksAmount = await Track.countDocuments({'album': album._id});
                newAlbums.push({ ...album.toObject(), trackAmount: tracksAmount});
            }
            return res.send({newAlbums, artist});
        } else {
            const result = await Album.find({isPublished: true});
            return res.send(result);
        }
    } catch {
        return res.sendStatus(500);
    }
});

albumsRouter.get('/admin', auth, permit('admin'), async (req, res) => {
    try {
        const result = await Album.find().populate({path: 'artist', select: 'name'});
        return res.send(result);
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


albumsRouter.post('/', auth, permit('admin', 'user'), imagesUpload.single('image'), async (req, res, next) => {
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

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;
        const album = await Album.findById(id);

        if (!album) {
            return res.status(404).send('Not found!');
        }

        const toggle = await Album.findOneAndUpdate({_id: id}, {isPublished: !album.isPublished});

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
        const album = await Album.findById(id);

        if (!album) {
            return res.status(404).send('Not Found!');
        }

        // if (user._id.toString() !== artist.user.toString()) {
        //     return res.status(403).send('Error!');
        // }

        await Track.deleteMany({'album': id});
        await Album.findByIdAndRemove(id);
        // const filePath = config.publicPath + '/' + album.image;
        // fs.unlinkSync(filePath);

        res.send('Deleted');
    } catch (e) {
        res.status(500).send('error');
    }
});

export default albumsRouter;