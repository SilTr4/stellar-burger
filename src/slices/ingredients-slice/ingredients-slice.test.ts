import { describe, test, expect } from '@jest/globals';

import {
  ingredientsSlice,
  IngredientsState,
  getIngredientsData
} from './ingredients-slice';

describe('ingredientsSlice', () => {
  const initialState: IngredientsState = {
    ingredients: [],
    loading: true,
    error: undefined
  };

  test('set loading true, when pending', () => {
    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredientsData.pending('')
    );

    expect(actualState).toEqual({
      ingredients: [],
      loading: true,
      error: undefined
    });
  });
});
