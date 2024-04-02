// for creating store
import { configureStore } from "@reduxjs/toolkit";

// Auth Reducer
import { authReducer } from "../Redux/Reducers/authReducer";
// post reducer
import { postReducer } from "../Redux/Reducers/postReducer";

// creating store from reducers
export const store = configureStore({
  reducer: {
    authReducer,
    postReducer,
  },
});
