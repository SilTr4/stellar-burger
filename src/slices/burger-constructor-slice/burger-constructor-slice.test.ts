import {
  addIngredient,
  burgerConstructorSlice,
  moveToBottom,
  moveToTop,
  removeIngredient,
  initialState
} from './burger-constructor-slice';

describe('burger constructor slice', () => {
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

  const mains = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      id: '1'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0,
      id: '2'
    }
  ];

  it('set ingredients to store', () => {
    const actualState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );

    expect(actualState).toEqual({
      bun: { ...bun, id: expect.any(String) },
      ingredients: []
    });
  });

  it('set ingredients to store', () => {
    const actualState = burgerConstructorSlice.reducer(
      { ...initialState, ingredients: mains },
      removeIngredient('2')
    );

    expect(actualState).toEqual({
      ...initialState,
      ingredients: [mains[0]]
    });
  });

  it('set ingredients to store', () => {
    const actualState = burgerConstructorSlice.reducer(
      { ...initialState, ingredients: mains },
      moveToTop('2')
    );

    expect(actualState).toEqual({
      ...initialState,
      ingredients: [mains[1], mains[0]]
    });
  });

  it('set ingredients to store', () => {
    const actualState = burgerConstructorSlice.reducer(
      { ...initialState, ingredients: mains },
      moveToBottom('1')
    );

    expect(actualState).toEqual({
      ...initialState,
      ingredients: [mains[1], mains[0]]
    });
  });
});
