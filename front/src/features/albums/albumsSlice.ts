import {IAlbumType} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAlbums} from "./albumsThunk";

interface AlbumsState {
    albums: IAlbumType | null;
    fetchLoading: boolean;
}

const initialState: AlbumsState = {
    albums: null,
    fetchLoading: false,
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
    }
});

export const albumsReducer = AlbumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumLoading = (state: RootState) => state.albums.fetchLoading;