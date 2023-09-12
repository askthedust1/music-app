import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ITrackFull} from "../../types";


export const fetchTracks = createAsyncThunk(
    'tracks/fetchAll',
    async(id: string) => {
        const tracksResponse = await axiosApi.get<ITrackFull[]>(`/tracks?album=${id}`);
        return tracksResponse.data;
    }
);