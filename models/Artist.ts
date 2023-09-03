import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    description: String
});


const Album = mongoose.model('Album', AlbumSchema);
export default Album;