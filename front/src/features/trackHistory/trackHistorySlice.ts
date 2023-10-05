import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IHistory } from '../../types';
import { createHistory, fetchHistory } from './trackHistoryThunk';

interface TrackHistoryState {
  history: IHistory[];
  fetchLoading: boolean;
  fetchCreateLoading: boolean;
}

const initialState: TrackHistoryState = {
  history: [],
  fetchLoading: false,
  fetchCreateLoading: false,
};

export const TrackHistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchHistory.fulfilled, (state, { payload: history }) => {
      state.fetchLoading = false;
      state.history = history;
    });

    builder.addCase(fetchHistory.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createHistory.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(createHistory.fulfilled, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createHistory.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const tracksHistoryReducer = TrackHistorySlice.reducer;
export const selectHistory = (state: RootState) => state.trackHistory.history;
export const selectHistoryLoading = (state: RootState) => state.trackHistory.fetchLoading;
