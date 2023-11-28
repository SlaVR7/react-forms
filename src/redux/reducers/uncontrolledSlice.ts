import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  age: null,
  email: null,
  password: null,
  gender: null,
  accept: null,
  file: null,
  country: null,
};

const uncontrolledSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setAccept(state, action) {
      state.accept = action.payload;
    },
    setFile(state, action) {
      state.file = action.payload;
    },
    setCountry(state, action) {
      state.country = action.payload;
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
} = uncontrolledSlice.actions;

export default uncontrolledSlice.reducer;
