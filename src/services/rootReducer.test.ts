import { rootReducer } from './store';

import { ingredientsSlice } from '../slices/ingredients-slice/ingredients-slice';
import { burgerConstructorSlice } from '../slices/burger-constructor-slice/burger-constructor-slice';
import { userSlice } from '../slices/user-slice/user-slice';
import { feedSlice } from '../slices/feed-slice/feed-slice';
import { orderSlice } from '../slices/orders-slice/orders-slice';

describe('rootReducer', () => {
  it('correct initialization', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      ingredients: ingredientsSlice.reducer(undefined, initAction),
      burgerConstructor: burgerConstructorSlice.reducer(undefined, initAction),
      user: userSlice.reducer(undefined, initAction),
      feed: feedSlice.reducer(undefined, initAction),
      orders: orderSlice.reducer(undefined, initAction)
    });
  });
});
