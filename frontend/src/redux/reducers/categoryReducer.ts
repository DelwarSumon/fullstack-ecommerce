import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../common/axiosInstance";
import {Category} from "../../types/category"

const initialState: Category[] = [];
export const fetchAllCatagory = createAsyncThunk(
  "fetchAllCatagory",
  async () => {
    try {
      const response = await axiosInstance.get("categories");
      const data : Category[] = response.data
      return data;
    } catch (error: any) {
      const e = error as AxiosError;
      return e;
    }
  }
);
const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {
    /**manage sync process */
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllCatagory.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        return action.payload;
      })
      .addCase(fetchAllCatagory.rejected, (state, action) => {
        return state;
      })
      .addCase(fetchAllCatagory.pending, (state, action) => {
        return state;
      });
  },
});

const categoryReducer = categorySlice.reducer;
export const {} = categorySlice.actions;
export default categoryReducer;
