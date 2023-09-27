import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectAlbumLoading, selectAlbums, selectAlbumsAdmin} from "../albums/albumsSlice";
import {fetchAdminAlbums, fetchAlbums} from "../albums/albumsThunk";
import {fetchArtistsAdmin} from "../artists/artistsThunk";
import {selectArtistsAdmin} from "../artists/artistsSlice";
import ArtistsItem from "../artists/ArtistsItem/ArtistsItem";
import AdminItem from "./AdminItem";

const Admin = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbumsAdmin);
    const artists = useAppSelector(selectArtistsAdmin);

    useEffect(() => {
        dispatch(fetchAdminAlbums());
        dispatch(fetchArtistsAdmin());
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
                />
            ))}
            <h1>Tracks</h1>
        </div>
    );
};

export default Admin;