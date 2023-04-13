import { CartButton, CartItems, CartReducer } from "../../types/cart";

import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const addUpdateItemsToCart = (
  state: CartReducer,
  action: PayloadAction<CartButton>
) => {
  try {
    // const cartList: CartItems[] = localStorage.getItem("cartitems") ? JSON.parse(localStorage.getItem("cartitems") || "") : [];

    const cartList = state.items;
    let newCartItem: CartItems[] = [];
    let foundItemInCart = cartList.find(
      (item) => item.id === action.payload.id
    );
  
    if (foundItemInCart) {
      foundItemInCart.count++;

      newCartItem = cartList.map((item) =>
        action.payload.id === item.id
          ? { ...item, count: item.count || 1 }
          : item
      );
      toast.success(`Item is updated to the cart.`);
    } else {
      const newitem: CartItems = { ...action.payload, count: 1 };
      newCartItem = [...cartList, newitem];
      state.items.push(newitem);
      state.count++;
      toast.success(`Item is added to the cart.`);
    }
    const total = cartList.reduce( (accumulator, item) => accumulator + item.product.price * item.count, 0 )
    state.total = total
    localStorage.setItem("cartitems", JSON.stringify(newCartItem));
  } catch (error: any) {
    // throw new Error(error.message);
    console.log("error - ", error);
  }
};

export const decreaseCart = (
  state: CartReducer,
  action: PayloadAction<string>
) => {
  try {
    const cartList = state.items;
    let foundItemInCart = cartList.find(
      (item) => item.id === action.payload
    );
    if (foundItemInCart && foundItemInCart.count > 1) {
      foundItemInCart.count--;
      const total = cartList.reduce( (accumulator, item) => accumulator + item.product.price * item.count, 0 )
      state.total = Number(total.toFixed(2));
      localStorage.setItem("cartitems", JSON.stringify(state.items));
      toast.success(`Item is decreased from the cart.`);
    }else{
      toast.error(`Item have to be minimum 1 quantity.`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const increaseCart = (
  state: CartReducer,
  action: PayloadAction<string>
) => {
  try {
    const cartList = state.items;
    let foundItemInCart = cartList.find(
      (item) => item.id === action.payload
    );
    if (foundItemInCart) {
      foundItemInCart.count++;
      const total = cartList.reduce( (accumulator, item) => accumulator + item.product.price * item.count, 0 )
      state.total = Number(total.toFixed(2));
      localStorage.setItem("cartitems", JSON.stringify(state.items));
      toast.success(`Item is increased to the cart.`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteCart = (
  state: CartReducer,
  action: PayloadAction<string>
) => {
  try {
    const cartList = state.items;

    const newCartItem: CartItems[] = cartList.filter(
      (item) => item.id !== action.payload
    );
    state.items = newCartItem;
    state.count--
    const total = newCartItem.reduce( (accumulator, item) => accumulator + item.product.price * item.count, 0 )
    state.total = total
    localStorage.setItem("cartitems", JSON.stringify(newCartItem));
    toast.success(`Item is deleted from the cart.`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const emptyCart = (state: CartReducer) => {
  try {
    state.items = [];
    state.count = 0;
    state.total = 0
    localStorage.setItem("cartitems", JSON.stringify([]));
    toast.success(`All items are removed from the cart.`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const totalAmount = (state: CartReducer) => {
  const total = state.items.reduce( (accumulator, item) => accumulator + item.product.price * item.count, 0 )
  state.total = total
}
