import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectAlbumsAdmin} from "../albums/albumsSlice";
import {delAlbums, fetchAdminAlbums, patchAlbums} from "../albums/albumsThunk";
import {delArtists, fetchArtistsAdmin, patchArtists} from "../artists/artistsThunk";
import {selectArtistsAdmin} from "../artists/artistsSlice";
import AdminItem from "./AdminItem";
import {selectTracksAdmin} from "../tracks/tracksSlice";
import {delTracks, fetchTracksAdmin, patchTrack} from '../tracks/tracksThunk';

const Admin = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbumsAdmin);
    const artists = useAppSelector(selectArtistsAdmin);
    const tracks = useAppSelector(selectTracksAdmin);

    useEffect(() => {
        dispatch(fetchAdminAlbums());
        dispatch(fetchArtistsAdmin());
        dispatch(fetchTracksAdmin());
    }, [dispatch]);

    return (
        <div>
            <h1>Artists</h1>
            {artists.map((item) => (
                <AdminItem
                    _id={item._id}
                    key={item._id}
                    name={item.name}
                    isPublished={item.isPublished}
                    onToggle={() => dispatch(patchArtists(item._id))}
                    onDel={() => dispatch(delArtists(item._id))}
                />
            ))}
            <h1>Albums</h1>
            {albums.map((item) => (
                <AdminItem
                    _id={item._id}
                    key={item._id}
                    name={item.name}
                    isPublished={item.isPublished}
                    title={item.artist.name}
                    onToggle={() => dispatch(patchAlbums(item._id))}
                    onDel={() => dispatch(delAlbums(item._id))}
                />
            ))}
            <h1>Tracks</h1>
            {tracks.map((item) => (
                <AdminItem
                    _id={item._id}
                    key={item._id}
                    name={item.name}
                    isPublished={item.isPublished}
                    title={item.album.name}
                    onToggle={() => dispatch(patchTrack(item._id))}
                    onDel={() => dispatch(delTracks(item._id))}
                />
            ))}
        </div>
    );
};

export default Admin;