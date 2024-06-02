import { ingredientsSlice, IngredientsState } from './ingredients-slice';
import { getIngredientsData } from './ingredients-slice';

describe('ingredientsSlice', () => {
  const initialState: IngredientsState = {
    ingredients: [],
    loading: true,
    error: undefined
  };

  it('set loading true, when pending', () => {
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

  it('set state with data and set isLoading false, when fullfilled', () => {
    const bun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredientsData.fulfilled([bun], '')
    );

    expect(actualState).toEqual({
      ingredients: [bun],
      loading: false,
      error: undefined
    });
  });

  it('set error, when request crushed', () => {
    const error = new Error('Test error');

    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredientsData.rejected(error, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      loading: false,
      error: error.message
    });
  });
});
