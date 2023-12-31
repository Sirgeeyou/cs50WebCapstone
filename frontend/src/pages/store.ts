import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
/* you can create reducers in another folder for oragnization */

const initialState = {
  value: { username: "", jwtToken: null },
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user" /* this is the name of the slice */,
  initialState /* this is the initial state of the slice. this where we specify how this user slice will look like */,
  reducers: {
    /* these are functions that take in a state(the previous state of the app) and an action.
         The action will be something we get to modify the state and return the new state*/
    login: (state, action) => {
      if (action.payload.success) {
        state.value.username = action.payload.username;
        state.value.jwtToken = action.payload.jwtToken;
        state.isLogged = true;
      } else {
        state.value = initialState.value;
        state.isLogged = false;
      }
    },
    logout: (state) => {
      state.value = initialState.value;
    },
    setJwtToken: (state, action) => {
      state.value.jwtToken = action.payload;
    },
  },
});

export const { login, logout, setJwtToken } = userSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  /* a reducer is a function that takes the current state and an action, and returns a new state. 
    its a function that will describe how the states interact with each other */
});
