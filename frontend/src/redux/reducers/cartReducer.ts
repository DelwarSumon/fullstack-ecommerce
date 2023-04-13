import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducer, CartItems } from "../../types/cart";
import {
  addUpdateItemsToCart,
  deleteCart,
  emptyCart,
  decreaseCart,
  increaseCart,
  totalAmount
} from "../methods/cartMethods";
const cartList: CartItems[] = localStorage.getItem("cartitems")
      ? JSON.parse(localStorage.getItem("cartitems") || "")
      : [];
const initialState: CartReducer = {
  items: cartList,
  count: cartList.length,
  total: cartList.reduce( (accumulator, item) => accumulator + item.product.price * item.count, 0 )
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    /**manage sync process */
    addToCart: addUpdateItemsToCart,
    deleteCartItem: deleteCart,
    emptyCartItem: emptyCart,
    decreaseCartItem: decreaseCart,
    increaseCartItem: increaseCart,
    totalCartAmount: totalAmount,
  },
  extraReducers: (build) => {},
});

const cartReducer = cartSlice.reducer;
export const { addToCart, deleteCartItem, emptyCartItem, decreaseCartItem, increaseCartItem, totalCartAmount } = cartSlice.actions;
export default cartReducer;
