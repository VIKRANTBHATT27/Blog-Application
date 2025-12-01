import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {        //initial state of the user like userData
     status: false,      //indicating user is not logged in 
     userData: null
}

const authSlice = createSlice({              //slice is an object
     name: "auth",
     initialState: initialState,
     reducers: {
          logIn: (state, action) => {
               state.status = true;
               state.userData = action.payload;
          },
          logOut: (state) => {
               state.status = false;
               state.userData = null;
          }
     }
});


//export all the reducers functions as component might use them easily when required
export const { logIn, logOut } = authSlice.actions;
//all reducer functions are called actions;

export default authSlice.reducer;