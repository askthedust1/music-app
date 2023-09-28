import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumMutation, IAlbumAdmin, IAlbumType} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAlbums = createAsyncThunk(
    'albums/fetchAll',
    async(id: string) => {
        const albumResponse = await axiosApi.get<IAlbumType | null>(`/albums?artist=${id}`);
        return albumResponse.data;
    }
);

export const fetchAdminAlbums = createAsyncThunk(
    'albums/fetchAdmin',
    async() => {
        const albumResponse = await axiosApi.get<IAlbumAdmin[]>(`/albums/admin`);
        return albumResponse.data;
    }
);

export const delAlbums = createAsyncThunk(
    'albums/delAlbums',
    async(_id: string) => {
        await axiosApi.delete(`/albums/${_id}`);
    }
);

export const patchAlbums = createAsyncThunk(
    'albums/patchAlbums',
    async(_id: string) => {
        await axiosApi.patch(`/albums/${_id}/togglePublished`);
    }
);

export const createAlbum = createAsyncThunk(
    'albums/create',
    async (albumMutation: AlbumMutation) => {

        const formData = new FormData();
        const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];

        keys.forEach(key => {
            const value = albumMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post('/albums', formData);
    }
);