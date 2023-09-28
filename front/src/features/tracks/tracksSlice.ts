import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {ITrackFull, IType} from "../../types";
import {createTrack, delTracks, fetchTracks, fetchTracksAdmin, patchTrack} from "./tracksThunk";

interface TracksState {
    tracks: IType | null;
    tracksAdmin: ITrackFull[];
    fetchLoading: boolean;
    createLoading: boolean;
    patchLoading: boolean;
    delLoading: boolean;
}

const initialState: TracksState = {
    tracks: null,
    tracksAdmin: [],
    fetchLoading: false,
    createLoading: false,
    patchLoading: false,
    delLoading: false
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

        builder.addCase(createTrack.pending, (state) => {
            state.createLoading = true;
        });

        builder.addCase(createTrack.fulfilled, (state) => {
            state.createLoading = false;
        });

        builder.addCase(createTrack.rejected, (state) => {
            state.createLoading = false;
        });

        builder.addCase(fetchTracksAdmin.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchTracksAdmin.fulfilled, (state, {payload: tracks}) => {
            state.fetchLoading = false;
            state.tracksAdmin = tracks;
        });

        builder.addCase(fetchTracksAdmin.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(patchTrack.pending, (state) => {
            state.patchLoading = true;
        });

        builder.addCase(patchTrack.fulfilled, (state) => {
            state.patchLoading = false;
        });

        builder.addCase(patchTrack.rejected, (state) => {
            state.patchLoading = false;
        });

        builder.addCase(delTracks.pending, (state) => {
            state.delLoading = true;
        });

        builder.addCase(delTracks.fulfilled, (state) => {
            state.delLoading = false;
        });

        builder.addCase(delTracks.rejected, (state) => {
            state.delLoading = false;
        });
    }
});

export const tracksReducer = TrackSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksAdmin = (state: RootState) => state.tracks.tracksAdmin;
export const selectTracksLoading = (state: RootState) => state.tracks.fetchLoading;