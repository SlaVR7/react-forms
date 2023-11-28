import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uncontrolledSlice from './reducers/uncontrolledSlice';

const rootReducer = combineReducers({
  uncontrolledSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
