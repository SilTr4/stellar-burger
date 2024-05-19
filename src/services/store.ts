import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from '../slices/ingredients-slice/ingredients-slice';
import { burgerReducer } from '../slices/burger-constructor-slice/burger-constructor-slice';
import { userReducer } from '../slices/user-slice/user-slice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerIngredients: burgerReducer,
  userReducer: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
