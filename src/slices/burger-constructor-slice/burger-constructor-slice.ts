import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type IBurgerIngredientsState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: IBurgerIngredientsState = {
  bun: null,
  ingredients: []
};

export const burgerIngredientsSlice = createSlice({
  name: 'burger/ingredients',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      switch (ingredient.type) {
        case 'bun':
          state.bun = ingredient;
          return;
        default:
          state.ingredients.push({
            ...action.payload,
            id: window.crypto.randomUUID()
          });
          return;
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
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
