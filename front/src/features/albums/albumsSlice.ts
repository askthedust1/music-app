import {IAlbumType} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createAlbum, fetchAlbums} from "./albumsThunk";
import {createArtist} from "../artists/artistsThunk";

interface AlbumsState {
    albums: IAlbumType | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: AlbumsState = {
    albums: null,
    fetchLoading: false,
    createLoading: false,
};

export const AlbumsSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbums.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
            state.fetchLoading = false;
            state.albums = albums;
        });

        builder.addCase(fetchAlbums.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(createAlbum.pending, (state) => {
            state.createLoading = true;
        });

        builder.addCase(createAlbum.fulfilled, (state) => {
            state.createLoading = false;
        });

        builder.addCase(createAlbum.rejected, (state) => {
            state.createLoading = false;
        });
    }
});

export const albumsReducer = AlbumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumLoading = (state: RootState) => state.albums.fetchLoading;
export const selectAlbumCreateLoading = (state: RootState) => state.albums.createLoading;
