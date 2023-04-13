import { PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductReducer } from "../../types/product";

export const sortName = (
  state: ProductReducer,
  action: PayloadAction<"asc" | "desc">
) => {
  if (action.payload === "asc") {
    state.productList.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    state.productList.sort((a, b) => b.title.localeCompare(a.title));
  }
};

export const modify = (
  state: ProductReducer,
  action: PayloadAction<{ index: number; update: Product }>
) => {
  // const foundItem = state.find(item => item.id === action.payload.id)
  // if(foundItem){
  //   return state.map(item => {
  //     if(item.id === action.payload.id){
  //       item = action.payload
  //     }
  //     return item
  //   })
  // }else{
  //   throw new Error("Item not found");
  // }

  // state[action.payload] = {
  //   ...state[action.payload],
  //   title: state[action.payload].title + " New"
  // }
  state.productList[action.payload.index] = action.payload.update;
};
