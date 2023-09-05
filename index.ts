import express from 'express';
import mongoose from 'mongoose';
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from './routers/tracks';
import usersRouter from "./routers/users";
import trackHistoryRouter from "./routers/track_history";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/shop');


    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });


    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));