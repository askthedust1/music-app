import {IArtistFull} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchArtists} from "./artistsThunk";

interface ArtistsState {
    artists: IArtistFull[];
    fetchLoading: boolean;
}

const initialState: ArtistsState = {
    artists: [],
    fetchLoading: false,
};

export const ArtistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchArtists.fulfilled, (state, {payload: products}) => {
            state.fetchLoading = false;
            state.artists = products;
        });

        builder.addCase(fetchArtists.rejected, (state) => {
            state.fetchLoading = false;
        });

    }
});

export const artistsReducer = ArtistsSlice.reducer;