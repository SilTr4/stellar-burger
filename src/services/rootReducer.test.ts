import { describe, test, expect } from '@jest/globals';
import { rootReducer } from './store';

import { ingredientsSlice } from '../slices/ingredients-slice/ingredients-slice';
import { burgerConstructorSlice } from '../slices/burger-constructor-slice/burger-constructor-slice';
import { userSlice } from '../slices/user-slice/user-slice';
import { feedSlice } from '../slices/feed-slice/feed-slice';
import { orderSlice } from '../slices/orders-slice/orders-slice';
import { combineReducers } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  test('correct initialization', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual(
      combineReducers({
        [ingredientsSlice.name]: ingredientsSlice.reducer(
          undefined,
          initAction
        ),
        [burgerConstructorSlice.name]: burgerConstructorSlice.reducer(
          undefined,
          initAction
        ),
        [userSlice.name]: userSlice.reducer(undefined, initAction),
        [feedSlice.name]: feedSlice.reducer(undefined, initAction),
        [orderSlice.name]: orderSlice.reducer(undefined, initAction)
      })
    );
  });
});
