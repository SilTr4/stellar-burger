import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type IBurgerIngredientsState = {
  ingredients: TIngredient[];
};

const initialState: IBurgerIngredientsState = {
  ingredients: []
};

const burgerIngredientsSlice = createSlice({
  name: 'burger-ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    }
  },
  selectors: {
    getBurgersIngredients: (state) => state
  }
});

export const burgerReducer = burgerIngredientsSlice.reducer;
export const { addIngredient, removeIngredient } =
  burgerIngredientsSlice.actions;
export const { getBurgersIngredients } = burgerIngredientsSlice.selectors;
