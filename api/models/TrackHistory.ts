import mongoose from "mongoose";
import User from "./User";
import Track from "./Track";
import Artist from "./Artist";

const Schema = mongoose.Schema;


const TrackHistorySchema = new Schema({
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) =>
                await Track.findById(value),
            message: 'Track not find!'
        }
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) =>
                await Artist.findById(value),
            message: 'Artist not find!'
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) =>
                await User.findById(value),
            message: 'User not find!'
        }
    },
    datetime: {
        type: String,
        required: true
    },
});


const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;