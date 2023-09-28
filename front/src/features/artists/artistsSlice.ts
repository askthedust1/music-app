import {IArtistFull} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createArtist, delArtists, fetchArtists, fetchArtistsAdmin, patchArtists} from "./artistsThunk";
import {RootState} from "../../app/store";

interface ArtistsState {
    artists: IArtistFull[];
    artistsAdmin: IArtistFull[],
    fetchLoadingAdmin: boolean,
    fetchLoading: boolean;
    createLoading: boolean;
    patchLoading: boolean;
    delLoading: boolean;
}

const initialState: ArtistsState = {
    artists: [],
    artistsAdmin: [],
    fetchLoadingAdmin: false,
    fetchLoading: false,
    createLoading: false,
    patchLoading: false,
    delLoading: false
};

export const ArtistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
            state.fetchLoading = false;
            state.artists = artists;
        });

        builder.addCase(fetchArtists.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(createArtist.pending, (state) => {
            state.createLoading = true;
        });

        builder.addCase(createArtist.fulfilled, (state) => {
            state.createLoading = false;
        });

        builder.addCase(createArtist.rejected, (state) => {
            state.createLoading = false;
        });

        builder.addCase(fetchArtistsAdmin.pending, (state) => {
            state.fetchLoadingAdmin = true;
        });

        builder.addCase(fetchArtistsAdmin.fulfilled, (state, {payload: artists}) => {
            state.fetchLoadingAdmin = false;
            state.artistsAdmin = artists;
        });

        builder.addCase(fetchArtistsAdmin.rejected, (state) => {
            state.fetchLoadingAdmin = false;
        });

        builder.addCase(patchArtists.pending, (state) => {
            state.patchLoading = true;
        });

        builder.addCase(patchArtists.fulfilled, (state) => {
            state.patchLoading = false;
        });

        builder.addCase(patchArtists.rejected, (state) => {
            state.patchLoading = false;
        });

        builder.addCase(delArtists.pending, (state) => {
            state.delLoading = true;
        });

        builder.addCase(delArtists.fulfilled, (state) => {
            state.delLoading = false;
        });

        builder.addCase(delArtists.rejected, (state) => {
            state.delLoading = false;
        });

    }
});

export const artistsReducer = ArtistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsAdmin = (state: RootState) => state.artists.artistsAdmin;

export const selectLoading = (state: RootState) => state.artists.fetchLoading;
export const selectArtistsCreateLoading = (state: RootState) => state.artists.createLoading;
