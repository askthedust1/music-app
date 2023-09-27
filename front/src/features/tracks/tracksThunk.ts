import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {IType, TrackMutation} from "../../types";


export const fetchTracks = createAsyncThunk(
    'tracks/fetchAll',
    async(id: string) => {
        const tracksResponse = await axiosApi.get<IType>(`/tracks?album=${id}`);
        return tracksResponse.data;
    }
);

export const createTrack = createAsyncThunk(
    'tracks/create',
    async (trackMutation: TrackMutation) => {
        await axiosApi.post('/tracks', trackMutation);
    }
);