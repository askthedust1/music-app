import mongoose from "mongoose";
import crypto from "crypto";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import TrackHistory from "./models/TrackHistory";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
        await db.dropCollection('trackhistories');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [artistPlacebo, artistAltJ, artistMassive, artistFlorence] = await Artist.create({
        name: 'Placebo',
        description: 'alternative rock',
        image: 'fixtures/placebo.jpg'
    }, {
        name: 'Alt-J',
        description: 'indie rock',
        image: 'fixtures/Alt-J.jpeg'
    }, {
        name: 'Massive Attack',
        description: 'trip hop',
        image: 'fixtures/massive_attack.jpg'
    }, {
        name: 'Florence and the Machine',
        description: 'indie',
        image: 'fixtures/florence.jpeg'
    });

    const [placeboAlbum1, placeboAlbum2, altjAlbum1, altjAlbum2, massiveAlbum1, florenceAlbum1] = await Album.create({
        name: 'Sleeping with Ghosts',
        image: 'fixtures/Sleeping_with_ghosts.jpg',
        date: 2003,
        artist: artistPlacebo._id
    }, {
        name: 'Meds',
        image: 'fixtures/meds.jpg',
        date: 2006,
        artist: artistPlacebo._id
    }, {
        name: 'Relaxer',
        image: 'fixtures/relaxer.jpg',
        date: 2017,
        artist: artistAltJ._id
    }, {
        name: 'This Is All Yours',
        image: 'fixtures/this_is_all_yours.jpg',
        date: 2014,
        artist: artistAltJ._id
    }, {
        name: 'Mezzanine',
        image: 'fixtures/mezzanine.png',
        date: 1998,
        artist: artistMassive._id
    }, {
        name: 'Ceremonials',
        image: 'fixtures/ceremonials.jpeg',
        date: 2011,
        artist: artistFlorence._id
    });

    const [track1, track2, track3, track4] = await Track.create({
        name: 'This Picture',
        album: placeboAlbum1._id,
        time: '3:34',
        number: 1,
        youtube: 'x7mOxdEDNn8'
    }, {
        name: '3WWW',
        album: altjAlbum1._id,
        time: '5:00',
        number: 1,
        youtube: 'ZwBkXgWNs_M'
    }, {
        name: 'Angel',
        album: massiveAlbum1._id,
        time: '6:18',
        number: 1,
        youtube: 'xiK2JlBpzvI'
    }, {
        name: 'Never Let Me Go',
        album: florenceAlbum1._id,
        time: '4:31',
        number: 3,
        youtube: 'zMBTvuUlm98'
    });

    await Track.create({
        name: 'Sleeping with Ghosts',
        album: placeboAlbum1._id,
        time: '4:38',
        number: 2,
        youtube: 'PC2MFz6n4u0'
    }, {
        name: 'Special Needs',
        album: placeboAlbum1._id,
        time: '5:15',
        number: 3,
        youtube: 'HClZwFNNMKs'
    }, {
        name: 'I\'ll Be Yours',
        album: placeboAlbum1._id,
        time: '3:32',
        number: 4,
        youtube: 'ItOT_unMMyM'
    }, {
        name: 'Protect Me from What I Want',
        album: placeboAlbum1._id,
        time: '3:15',
        number: 5,
        youtube: 'NDT2Xhvadnw'
    }, {
        name: 'Meds',
        album: placeboAlbum2._id,
        time: '2:55',
        number: 1,
        youtube: 'WO9ewCO7TYI'
    }, {
        name: 'Infra-Red',
        album: placeboAlbum2._id,
        time: '3:15',
        number: 2,
        youtube: 'AFwy2UkCg6g'
    }, {
        name: 'Post Blue',
        album: placeboAlbum2._id,
        time: '3:11',
        number: 3,
        youtube: '6vlm4JsBsPE'
    }, {
        name: 'Song to Say Goodbye',
        album: placeboAlbum2._id,
        time: '3:34',
        number: 4,
        youtube: 'e7bxXjQL3cY'
    }, {
        name: 'Twenty Years',
        album: placeboAlbum2._id,
        time: '6:07',
        number: 5,
        youtube: '3hTFcwdyWX4'
    }, {
        name: 'In Cold Blood',
        album: altjAlbum1._id,
        time: '3:26',
        number: 2,
        youtube: 'rP0uuI80wuY'
    }, {
        name: 'House of the Rising Sun',
        album: altjAlbum1._id,
        time: '5:20',
        number: 3,
        youtube: 'X1Knskoe15g'
    }, {
        name: 'Deadcrush',
        album: altjAlbum1._id,
        time: '3:52',
        number: 4,
        youtube: 'GOJUNJ1o394'
    }, {
        name: 'Pleader',
        album: altjAlbum1._id,
        time: '4:40',
        number: 5,
        youtube: 'RrhSJzM8NLE'
    }, {
        name: 'Intro',
        album: altjAlbum2._id,
        time: '4:38',
        number: 1,
        youtube: 'GK9qXYgeV20'
    }, {
        name: 'Every Other Freckle',
        album: altjAlbum2._id,
        time: '3:36',
        number: 2,
        youtube: 'sTkJqSWDPQ8'
    }, {
        name: 'Left Hand Free',
        album: altjAlbum2._id,
        time: '2:53',
        number: 3,
        youtube: 'NRWUoDpo2fo'
    }, {
        name: 'Nara',
        album: altjAlbum2._id,
        time: '4:58',
        number: 4,
        youtube: 'aCvccKg5gZo'
    }, {
        name: 'Hunger of the Pine',
        album: altjAlbum2._id,
        time: '4:59',
        number: 5,
        youtube: 'dCCXq9QB-dQ'
    }, {
        name: 'Teardrop',
        album: massiveAlbum1._id,
        time: '5:29',
        number: 2,
        youtube: 'fsmzF1TqslY'
    }, {
        name: 'Spectrum',
        album: florenceAlbum1._id,
        time: '5:11',
        number: 1,
        youtube: 'iC-_lVzdiFE'
    }, {
        name: 'Hunger',
        album: florenceAlbum1._id,
        time: '3:11',
        number: 2,
        youtube: '5GHXEGz3PJg'
    });

    const [user, userTest] = await User.create({
        username: 'vikaa',
        password: 'victoria',
        token: crypto.randomUUID(),
    }, {
        username: 'somebodyy',
        password: '1234567',
        token: crypto.randomUUID(),
    });

    await TrackHistory.create({
        track: track1._id,
        artist: artistPlacebo,
        user: user._id,
        datetime: "2023-09-18T06:33:16.817Z"
    }, {
        track: track2._id,
        artist: artistAltJ,
        user: user._id,
        datetime: "2023-09-15T09:45:16.817Z"
    }, {
        track: track3._id,
        artist: artistMassive,
        user: user._id,
        datetime: "2023-09-17T23:53:16.817Z"
    }, {
        track: track4._id,
        artist: artistFlorence,
        user: user._id,
        datetime: "2023-09-01T03:03:16.817Z"
    }, {
        track: track2._id,
        artist: artistAltJ,
        user: userTest._id,
        datetime: "2023-09-02T01:20:16.817Z"
    }, {
        track: track4._id,
        artist: artistFlorence,
        user: userTest._id,
        datetime: "2023-09-10T06:33:16.817Z"
    }, {
        track: track4._id,
        artist: artistFlorence,
        user: userTest._id,
        datetime: "2023-09-16T19:15:16.817Z"
    }, {
        track: track3._id,
        artist: artistMassive,
        user: userTest._id,
        datetime: "2023-09-11T07:33:16.817Z"
    });


    await db.close();
};

run().catch(console.error);