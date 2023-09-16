import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {IHistory, IHistoryPost} from "../../types";
import {RootState} from "../../app/store";

export const createHistory = createAsyncThunk<void, IHistoryPost, {state: RootState}>(
    'history/create',
    async (IHistoryPost, thunkAPI) => {
        const userState = thunkAPI.getState().users;
        await axiosApi.post('/track_history', IHistoryPost,
            { headers: { 'Authorization': userState.user?.token } });
    }
);

export const fetchHistory = createAsyncThunk<IHistory[], void, {state: RootState}>(
    'history/fetchAll',
    async(_, thunkAPI) => {
            const userState = thunkAPI.getState().users;
            const tracksResponse = await axiosApi.get<IHistory[]>(`/track_history`,
                { headers: { 'Authorization': userState.user?.token } });
            return tracksResponse.data;
    }
);