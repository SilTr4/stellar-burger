import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

export type IBurgerIngredientsState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: IBurgerIngredientsState = {
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
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearState: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveToTop: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (elem) => elem.id === action.payload
      );
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index - 1];
      state.ingredients[index - 1] = temp;
    },
    moveToBottom: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (elem) => elem.id === action.payload
      );
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = temp;
    }
  },
  selectors: {
    getBurgersIngredients: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearState,
  moveToTop,
  moveToBottom
} = burgerConstructorSlice.actions;
export const { getBurgersIngredients } = burgerConstructorSlice.selectors;
