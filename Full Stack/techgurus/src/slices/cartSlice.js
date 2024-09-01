import { createSlice } from "@reduxjs/toolkit";

let initialState = []
export const CartSlice = createSlice({
    name : "Cart",
    initialState,
    reducers:{
        add:((state,action)=>{
            state.push(action.payload)
        }),
        remove: ((state, action) => {
            return state.filter(item => item._id !== action.payload);
        }),
    }
})

export const  {remove, add } = CartSlice.actions;
export default CartSlice.reducer


