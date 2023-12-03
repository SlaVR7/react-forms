import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from '../../lib/types/interfaces';

const initialState: IInitialState = {
  name: [],
  age: [],
  email: [],
  password: [],
  gender: [],
  accept: [],
  file: [],
  country: [],
};

const cardsSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    setName(state, action) {
      state.name.push(action.payload);
    },
    setAge(state, action) {
      state.age.push(action.payload);
    },
    setEmail(state, action) {
      state.email.push(action.payload);
    },
    setPassword(state, action) {
      state.password.push(action.payload);
    },
    setGender(state, action) {
      state.gender.push(action.payload);
    },
    setAccept(state, action) {
      state.accept.push(action.payload);
    },
    setFile(state, action) {
      state.file.push(action.payload);
    },
    setCountry(state, action) {
      state.country.push(action.payload);
    },
  },
});

export const {
  setName,
  setAge,
  setCountry,
  setEmail,
  setGender,
  setPassword,
  setFile,
  setAccept,
} = cardsSlice.actions;

export default cardsSlice.reducer;
