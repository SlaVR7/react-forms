import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uncontrolledSlice from './reducers/uncontrolledSlice';
import countriesSlice from '../redux/reducers/countriesSlice';

const rootReducer = combineReducers({
  countriesSlice,
  uncontrolledSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
