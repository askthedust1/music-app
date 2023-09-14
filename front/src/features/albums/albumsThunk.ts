import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAlbumType} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAlbums = createAsyncThunk(
    'albums/fetchAll',
    async(id: string) => {
        const albumResponse = await axiosApi.get<IAlbumType | null>(`/albums?artist=${id}`);
        return albumResponse.data;
    }
);