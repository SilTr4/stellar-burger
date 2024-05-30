import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type IngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | undefined;
};

const initialState: IngredientsState = {
  ingredients: [],
  loading: true,
  error: undefined
};

export const getIngredientsData = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getIngredientsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsData.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredients } = ingredientsSlice.selectors;
