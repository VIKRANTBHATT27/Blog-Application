import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';

const store = configureStore({
     reducer: {
          // user: userReducers,
          auth: authSlice
     }
});


export default store;