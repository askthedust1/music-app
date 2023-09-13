import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import { IType} from "../../types";
import {fetchTracks} from "./tracksThunk";

interface TracksState {
    tracks: IType | null;
    fetchLoading: boolean;
}

const initialState: TracksState = {
    tracks: null,
    fetchLoading: false,
};

export const TrackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
            state.fetchLoading = false;
            state.tracks = tracks;
        });

        builder.addCase(fetchTracks.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const tracksReducer = TrackSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.fetchLoading;