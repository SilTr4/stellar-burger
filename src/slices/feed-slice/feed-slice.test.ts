import { feedSlice, getFeeds, initialState } from './feed-slice';

describe('feedSlice', () => {
  const testResponse = {
    success: true,
    total: 1,
    totalToday: 1,
    orders: [
      {
        _id: '665b8ba897ede0001d06e337',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный spicy минеральный бургер',
        createdAt: '2024-06-01T20:59:20.666Z',
        updatedAt: '2024-06-01T20:59:21.057Z',
        number: 1
      }
    ]
  };

  it('set success false and clear orders, when pending', () => {
    const actualState = feedSlice.reducer(initialState, getFeeds.pending(''));

    expect(actualState).toEqual({
      ...initialState,
      success: false,
      orders: []
    });
  });

  it('set state, when fullfilled', () => {
    const actualState = feedSlice.reducer(
      initialState,
      getFeeds.fulfilled(testResponse, '')
    );

    expect(actualState).toEqual({
      ...testResponse,
      error: undefined
    });
  });

  it('set error, when request crushed', () => {
    const error = new Error('Test error');

    const actualState = feedSlice.reducer(
      initialState,
      getFeeds.rejected(error, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      error: error.message
    });
  });
});
