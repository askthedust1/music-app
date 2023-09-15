import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";


const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('tracks');
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
        image: 'fixtures/Alt-j.jpeg'
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

    await Track.create({
        name: 'This Picture',
        album: placeboAlbum1._id,
        time: '3:34',
        number: 1,
    }, {
        name: 'Sleeping with Ghosts',
        album: placeboAlbum1._id,
        time: '4:38',
        number: 2,
    }, {
        name: 'Special Needs',
        album: placeboAlbum1._id,
        time: '5:15',
        number: 3,
    }, {
        name: 'I\'ll Be Yours',
        album: placeboAlbum1._id,
        time: '3:32',
        number: 4,
    }, {
        name: 'Protect Me from What I Want',
        album: placeboAlbum1._id,
        time: '3:15',
        number: 5,
    }, {
        name: 'Meds',
        album: placeboAlbum2._id,
        time: '2:55',
        number: 1,
    }, {
        name: 'Infra-Red',
        album: placeboAlbum2._id,
        time: '3:15',
        number: 2,
    }, {
        name: 'Post Blue',
        album: placeboAlbum2._id,
        time: '3:11',
        number: 3,
    }, {
        name: 'Song to Say Goodbye',
        album: placeboAlbum2._id,
        time: '3:34',
        number: 4,
    }, {
        name: 'Twenty Years',
        album: placeboAlbum2._id,
        time: '6:07',
        number: 5,
    }, {
        name: '3WWW',
        album: altjAlbum1._id,
        time: '5:00',
        number: 1,
    }, {
        name: 'In Cold Blood',
        album: altjAlbum1._id,
        time: '3:26',
        number: 2,
    }, {
        name: 'House of the Rising Sun',
        album: altjAlbum1._id,
        time: '5:20',
        number: 3,
    }, {
        name: 'Deadcrush',
        album: altjAlbum1._id,
        time: '3:52',
        number: 4,
    }, {
        name: 'Pleader',
        album: altjAlbum1._id,
        time: '4:40',
        number: 5,
    }, {
        name: 'Intro',
        album: altjAlbum2._id,
        time: '4:38',
        number: 1,
    }, {
        name: 'Every Other Freckle',
        album: altjAlbum2._id,
        time: '3:36',
        number: 2,
    }, {
        name: 'Left Hand Free',
        album: altjAlbum2._id,
        time: '2:53',
        number: 3,
    }, {
        name: 'Nara',
        album: altjAlbum2._id,
        time: '4:58',
        number: 4,
    }, {
        name: 'Hunger of the Pine',
        album: altjAlbum2._id,
        time: '4:59',
        number: 5,
    }, {
        name: 'Angel',
        album: massiveAlbum1._id,
        time: '6:18',
        number: 1,
    }, {
        name: 'Risingson',
        album: massiveAlbum1._id,
        time: '4:58',
        number: 2,
    }, {
        name: 'Teardrop',
        album: massiveAlbum1._id,
        time: '5:29',
        number: 3,
    }, {
        name: 'Inertia Creeps',
        album: massiveAlbum1._id,
        time: '5:56',
        number: 4,
    }, {
        name: 'Man Next Door',
        album: massiveAlbum1._id,
        time: '5:55',
        number: 5,
    }, {
        name: 'Spectrum',
        album: florenceAlbum1._id,
        time: '5:11',
        number: 1,
    }, {
        name: 'Shake It Out',
        album: florenceAlbum1._id,
        time: '3:11',
        number: 2,
    }, {
        name: 'Never Let Me Go',
        album: florenceAlbum1._id,
        time: '4:31',
        number: 3,
    });


    await db.close();
};

run().catch(console.error);