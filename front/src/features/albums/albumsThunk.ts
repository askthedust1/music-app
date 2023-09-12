import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAlbumFull} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAlbums = createAsyncThunk(
    'artists/fetchAll',
    async(id: string) => {
        const albumResponse = await axiosApi.get<IAlbumFull[]>(`/albums?artist=${id}`);
        return albumResponse.data;
    }
);