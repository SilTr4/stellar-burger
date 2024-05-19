import { TRegisterData, registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

export type TUserState = {
  isAuthenticated: boolean;
  name: string;
  isLoading: boolean;
};

const initialState: TUserState = {
  isAuthenticated: false,
  name: '',
  isLoading: false
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserName: (state) => state.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.name = action.payload.user.name;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      });
  }
});

export const userReducer = userSlice.reducer;
export const userData = userSlice.selectors;
