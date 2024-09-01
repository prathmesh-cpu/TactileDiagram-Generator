import {combineReducers} from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice"
import authReducer from "../slices/auth"

const rootReducer  = combineReducers({
    auth: authReducer,
    Cart:cartReducer
})

export default rootReducer