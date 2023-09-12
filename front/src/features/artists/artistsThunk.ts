import {createAsyncThunk} from "@reduxjs/toolkit";
import {IArtistFull} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchArtists = createAsyncThunk<IArtistFull[]>(
    'artists/fetchAll',
    async() => {
        const artistsResponse = await axiosApi.get<IArtistFull[]>('/artists');
        return artistsResponse.data;
    }
);