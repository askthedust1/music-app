import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectAlbumDel, selectAlbumLoadingAdmin, selectAlbumPatch, selectAlbumsAdmin} from "../albums/albumsSlice";
import {delAlbums, fetchAdminAlbums, patchAlbums} from "../albums/albumsThunk";
import {delArtists, fetchArtistsAdmin, patchArtists} from "../artists/artistsThunk";
import {selectArtistsAdmin, selectLoadingAdmin, selectLoadingDel, selectLoadingPatch} from "../artists/artistsSlice";
import AdminItem from "./AdminItem";
import {
    selectTracksAdmin,
    selectTracksLoadingAdmin,
    selectTracksLoadingDel,
    selectTracksLoadingPatch
} from "../tracks/tracksSlice";
import {delTracks, fetchTracksAdmin, patchTrack} from '../tracks/tracksThunk';
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

const Admin = () => {
    const dispatch = useAppDispatch();

    const albums = useAppSelector(selectAlbumsAdmin);
    const albumsLoading = useAppSelector(selectAlbumLoadingAdmin);
    const albumsLoadingDel = useAppSelector(selectAlbumDel);
    const albumsLoadingPatch = useAppSelector(selectAlbumPatch);

    const artists = useAppSelector(selectArtistsAdmin);
    const artistsLoading = useAppSelector(selectLoadingAdmin);
    const artistsLoadingDel = useAppSelector(selectLoadingDel);
    const artistsLoadingPatch = useAppSelector(selectLoadingPatch);

    const tracks = useAppSelector(selectTracksAdmin);
    const tracksLoading = useAppSelector(selectTracksLoadingAdmin);
    const tracksLoadingDel = useAppSelector(selectTracksLoadingDel);
    const tracksLoadingPatch = useAppSelector(selectTracksLoadingPatch);

    useEffect(() => {
        dispatch(fetchAdminAlbums());
        dispatch(fetchArtistsAdmin());
        dispatch(fetchTracksAdmin());
    }, [dispatch]);

    const upArtist = async (id: string) => {
        await dispatch(patchArtists(id));
        await dispatch(fetchArtistsAdmin());
    };

    const upAlbum = async (id: string) => {
        await dispatch(patchAlbums(id));
        await dispatch(fetchAdminAlbums());
    };

    const upTracks = async (id: string) => {
        await dispatch(patchTrack(id));
        await dispatch(fetchTracksAdmin());
    };

    const delArtist = async (id: string) => {
        await dispatch(delArtists(id));
        await dispatch(fetchArtistsAdmin());
    };

    const delAlbum = async (id: string) => {
        await dispatch(delAlbums(id));
        await dispatch(fetchAdminAlbums());
    };

    const delTrack = async (id: string) => {
        await dispatch(delTracks(id));
        await dispatch(fetchTracksAdmin());
    };

    return !artistsLoading && !albumsLoading && !tracksLoading ? (
        <div>
            <h1 style={{color: '#00E20B'}}>Artists</h1>
            {artists.map((item) => (
                <AdminItem
                    _id={item._id}
                    key={item._id}
                    name={item.name}
                    isPublished={item.isPublished}
                    onToggle={async () => upArtist(item._id)}
                    onDel={() => delArtist(item._id)}
                    loadingDel={albumsLoadingDel}
                    loadingPatch={albumsLoadingPatch}
                />
            ))}
            <h1 style={{color: '#00E20B'}}>Albums</h1>
            {albums.map((item) => (
                <AdminItem
                    _id={item._id}
                    key={item._id}
                    name={item.name}
                    isPublished={item.isPublished}
                    title={item.artist.name}
                    onToggle={() => upAlbum(item._id)}
                    onDel={() => delAlbum(item._id)}
                    loadingDel={artistsLoadingDel}
                    loadingPatch={artistsLoadingPatch}
                />
            ))}
            <h1 style={{color: '#00E20B'}}>Tracks</h1>
            {tracks.map((item) => (
                <AdminItem
                    _id={item._id}
                    key={item._id}
                    name={item.name}
                    isPublished={item.isPublished}
                    title={item.album.name}
                    onToggle={() => upTracks(item._id)}
                    onDel={() => delTrack(item._id)}
                    loadingDel={tracksLoadingDel}
                    loadingPatch={tracksLoadingPatch}
                />
            ))}
        </div>
    ) : <SpinnerLoading/>;
};

export default Admin;