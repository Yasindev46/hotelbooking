import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"
import roomReducer from "./Room/roomSlice";
import bookingReducer from "./Bookings/bookingSlice"

export const store=configureStore({
    reducer:{
        auth:authReducer,
        room:roomReducer,
        booking:bookingReducer
    }
})