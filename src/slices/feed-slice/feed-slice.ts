import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

const initialState: TOrdersData & { success: boolean } = {
  success: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const getFeeds = createAsyncThunk('feed/get', async () => getFeedsApi());

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.success = false;
        state.orders = [];
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const getFeedData = feedSlice.selectors.getFeedState;
