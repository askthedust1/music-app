import mongoose from "mongoose";
import User from "./User";
import Track from "./Track";

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
    datetime: String
});


const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;