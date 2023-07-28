import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
/* you can create reducers in another folder for oragnization */

export interface HotelStateDetails {
  hotelId: string;
  hotelName: string;
  imgUrl: string;
}

interface HotelStateValue {
  hotels: HotelStateDetails[];
}

interface HotelState {
  value: HotelStateValue;
}

const initialState = {
  value: { username: "", jwtToken: null },
  isLogged: false,
};

const initialStateHotel: HotelState = {
  value: {
    hotels: [],
  },
} as HotelState;

const hotelSlice = createSlice({
  name: "hotel",
  initialState: initialStateHotel,
  reducers: {
    addFavorites: (state, action: PayloadAction<HotelStateDetails>) => {
      state.value.hotels.push(action.payload); // Add the new hotel to the hotels array
    },
    removeFavorites: (state, action: PayloadAction<string>) => {
      state.value.hotels = state.value.hotels.filter(
        (hotel) => hotel.hotelId !== action.payload
      ); // Remove the hotel with the specified id from the hotels array
    },
  },
});

const userSlice = createSlice({
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

export const { addFavorites, removeFavorites } = hotelSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    hotel: hotelSlice.reducer,
  },
  /* a reducer is a function that takes the current state and an action, and returns a new state. 
    its a function that will describe how the states interact with each other */
});
