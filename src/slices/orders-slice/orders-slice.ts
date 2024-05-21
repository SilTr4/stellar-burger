import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderInitialState = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  currentOrder: TOrder | null;
};

const initialState: TOrderInitialState = {
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null
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
      .addCase(orderBurger.pending, (state) => {
        state.success = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.success = true;
        state.currentOrder = action.payload.order;
      });
  }
});

export const { resetCurrentOrder } = orderSlice.actions;
export const { getOrders } = orderSlice.selectors;
