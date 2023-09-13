import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ITrackFull, IType} from "../../types";


export const fetchTracks = createAsyncThunk(
    'tracks/fetchAll',
    async(id: string) => {
        const tracksResponse = await axiosApi.get<IType>(`/tracks?album=${id}`);
        return tracksResponse.data;
    }
);