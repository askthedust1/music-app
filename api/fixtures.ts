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

    const [artistPlacebo, artistAltJ] = await Artist.create({
        name: 'Placebo',
        description: 'alternative rock',
        image: 'fixtures/placebo.jpg'
    }, {
        name: 'Alt-J',
        description: 'indie rock',
        image: 'fixtures/Alt-j.jpeg'
    });

    const [placeboAlbum1, placeboAlbum2, altjAlbum1, altjAlbum2] = await Album.create({
        name: 'Sleeping with Ghosts',
        image: 'fixtures/Sleeping_with_ghosts.jpg',
        date: '24 March 2003',
        artist: artistPlacebo._id
    }, {
        name: 'Meds',
        image: 'fixtures/meds.jpg',
        date: '13 March 2006',
        artist: artistPlacebo._id
    }, {
        name: 'Relaxer',
        image: 'fixtures/relaxer.jpg',
        date: '2 June 2017',
        artist: artistAltJ._id
    }, {
        name: 'This Is All Yours',
        image: 'fixtures/this_is_all_yours.jpg',
        date: '22 September 2014',
        artist: artistAltJ._id
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
    });

    await db.close();
};

run().catch(console.error);