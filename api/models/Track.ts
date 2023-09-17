import mongoose from 'mongoose';
import Album from "./Album";

const Schema = mongoose.Schema;


const TrackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) =>
                await Album.findById(value),
            message: 'Album not find!'
        }
    },
    time: String,
    youtube: String,
    number: {
        type: Number,
        required: true
    },
});


const Track = mongoose.model('Track', TrackSchema);
export default Track;