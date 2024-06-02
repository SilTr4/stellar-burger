import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrderInitialState = {
  pending: boolean;
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  currentOrder: TOrder | null;
  error: string | undefined;
};

const initialState: TOrderInitialState = {
  pending: false,
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null,
  error: undefined
};

export const getOrdersData = createAsyncThunk('orders/getAll', async () =>
  getOrdersApi()
);

export const orderBurger = createAsyncThunk(
  'orders/makeOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  selectors: {
    getOrders: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersData.pending, (state) => {
        (state.success = false), (state.orders = []);
      })
      .addCase(getOrdersData.fulfilled, (state, action) => {
        state.success = true;
        state.orders = action.payload;
      })
      .addCase(getOrdersData.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(orderBurger.pending, (state) => {
        state.pending = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.pending = false;
        state.currentOrder = action.payload.order;
      });
  }
});

export const { resetCurrentOrder } = orderSlice.actions;
export const { getOrders } = orderSlice.selectors;
