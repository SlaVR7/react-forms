import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesSlice from '../redux/reducers/countriesSlice';
import cardsSlice from './reducers/cardsSlice';

const rootReducer = combineReducers({
  countriesSlice,
  cardsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
