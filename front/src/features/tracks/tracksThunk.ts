import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ITrackFull, IType, TrackMutation} from "../../types";


export const fetchTracks = createAsyncThunk(
    'tracks/fetchAll',
    async(id: string) => {
        const tracksResponse = await axiosApi.get<IType>(`/tracks?album=${id}`);
        return tracksResponse.data;
    }
);

export const fetchTracksAdmin = createAsyncThunk(
    'tracks/fetchAdmin',
    async() => {
        const tracksResponse = await axiosApi.get<ITrackFull[]>(`/tracks/admin`);
        return tracksResponse.data;
    }
);

export const patchTrack = createAsyncThunk(
    'tracks/patchTracks',
    async(_id: string) => {
        await axiosApi.patch(`/tracks/${_id}/togglePublished`);
    }
);

export const delTracks = createAsyncThunk(
    'tracks/delTracks',
    async(_id: string) => {
        await axiosApi.delete(`/tracks/${_id}`);
    }
);

export const createTrack = createAsyncThunk(
    'tracks/create',
    async (trackMutation: TrackMutation) => {
        await axiosApi.post('/tracks', trackMutation);
    }
);

