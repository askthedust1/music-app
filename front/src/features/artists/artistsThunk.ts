import {createAsyncThunk} from "@reduxjs/toolkit";
import {ArtistMutation, IArtistFull} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchArtists = createAsyncThunk<IArtistFull[]>(
    'artists/fetchAll',
    async() => {
        const artistsResponse = await axiosApi.get<IArtistFull[]>('/artists');
        return artistsResponse.data;
    }
);

export const fetchArtistsAdmin = createAsyncThunk<IArtistFull[]>(
    'artists/fetchAdmin',
    async() => {
        const artistsResponse = await axiosApi.get<IArtistFull[]>('/artists/admin');
        return artistsResponse.data;
    }
);

export const createArtist = createAsyncThunk(
    'artists/create',
    async (artistMutation: ArtistMutation) => {

        const formData = new FormData();
        const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];

        keys.forEach(key => {
            const value = artistMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post('/artists', formData);
    }
);