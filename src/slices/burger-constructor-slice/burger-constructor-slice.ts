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

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        switch (ingredient.type) {
          case 'bun':
            state.bun = ingredient;
            return;
          default:
            state.ingredients.push(action.payload);
            return;
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: window.crypto.randomUUID() }
      })
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

export const { addIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export const { getBurgersIngredients } = burgerConstructorSlice.selectors;
