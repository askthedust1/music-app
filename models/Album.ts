import mongoose from 'mongoose';
import Artist from "./Artist";

const Schema = mongoose.Schema;


const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: String,
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await Artist.findById(value),
            message: 'Artist not find!'
        }
    }
});


const Album = mongoose.model('Album', AlbumSchema);
export default Album;