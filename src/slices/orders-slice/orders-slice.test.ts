import {
  getOrdersData,
  orderBurger,
  orderSlice,
  resetCurrentOrder,
  initialState
} from './orders-slice';

describe('order slice', () => {
  const order = {
    _id: '1',
    name: 'order',
    status: 'ready',
    createdAt: '11',
    updatedAt: '12',
    number: 1,
    ingredients: ['1', '2', '3']
  };

  it('testing reset current order', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        currentOrder: order
      },
      resetCurrentOrder()
    );

    expect(actualState).toEqual(initialState);
  });

  it('set success false and clear order, when pending orders request', () => {
    const actualState = orderSlice.reducer(
      initialState,
      getOrdersData.pending('')
    );

    expect(actualState).toEqual({
      ...initialState,
      success: false,
      orders: []
    });
  });

  it('set success true and set order, when fullfilled orders request', () => {
    const actualState = orderSlice.reducer(
      initialState,
      getOrdersData.fulfilled([order], '')
    );

    expect(actualState).toEqual({
      ...initialState,
      success: true,
      orders: [order]
    });
  });

  it('set error, when order request crushed', () => {
    const error = new Error('Test Error');

    const actualState = orderSlice.reducer(
      initialState,
      getOrdersData.rejected(error, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      success: false,
      error: error.message
    });
  });

  it('set pending true, when pending order burger request', () => {
    const actualState = orderSlice.reducer(
      initialState,
      orderBurger.pending('', [])
    );

    expect(actualState).toEqual({
      ...initialState,
      pending: true
    });
  });

  it('set pending false and set currentOrder, when fullfilled order burger request', () => {
    const actualState = orderSlice.reducer(
      initialState,
      orderBurger.fulfilled(
        {
          order: order,
          name: '222',
          success: false
        },
        '',
        []
      )
    );

    expect(actualState).toEqual({
      ...initialState,
      pending: false,
      currentOrder: order
    });
  });

  it('set error, when order burger request crushed', () => {
    const error = new Error('Test Error');

    const actualState = orderSlice.reducer(
      initialState,
      orderBurger.rejected(error, '', [])
    );

    expect(actualState).toEqual({
      ...initialState,
      pending: false,
      error: error.message
    });
  });
});
