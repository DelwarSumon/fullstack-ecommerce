import {
  BaseUser,
  Credentials,
  ReturnCredentials,
  User,
  UserReducer,
} from "../../types/user";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../common/axiosInstance";
import { toast } from "react-hot-toast";

const initialState: UserReducer = {
  userList: [],
};
export const createUserForm = createAsyncThunk(
  "createUserForm",
  async (user: BaseUser, { dispatch }) => {
    try {
      /**check user email, exists or not first */
      // This API always return "isAvailable": false. If email exists or not exists in fakeAPi. Thats why i comment this and avoid email exists check
      // let isAvailable = false;
      // await dispatch(checkEmailExist(user.email))
      //   .then((res) => {
      //     if (res.payload instanceof AxiosError) {
      //       return res.payload
      //     } else {
      //       isAvailable = res.payload.isAvailable;
      //     }
      //   })
      //   .catch((err) => console.log(err));

      // if (isAvailable) {

      const response = await axiosInstance.post(
        "files/upload",
        { file: user.avatar[0] },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const url = response.data.location;

      const userResponse = await axiosInstance.post("users", {
        ...user,
        avatar: url,
      });
      const data: User = userResponse.data;
      return data;

      // }else{
      //   return {
      //     status: "error",
      //     message: "Email already exists."
      //   }
      // }
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const checkEmailExist = createAsyncThunk(
  "checkEmailExist",
  async (email: string) => {
    try {
      const userResponse = await axiosInstance.post("users/is-available", {
        email: email,
      });
      return userResponse.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const authenticateCredential = createAsyncThunk(
  "authenticateCredential",
  async ({ email, password }: Credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      const data: ReturnCredentials = response.data;
      const result = await thunkAPI.dispatch(loginUser(data.token));
      return result.payload as User;
    } catch (e) {
      const error = e as AxiosError;
      // return error;
      return Promise.reject(error)
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (access_token: string) => {
    try {
      const response = await axiosInstance.get("auth/profile", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data: User = response.data;
      localStorage.setItem("token", JSON.stringify(access_token));
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    /**manage sync process */
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(createUserForm.fulfilled, (state, action) => {
        return state;
      })
      .addCase(checkEmailExist.fulfilled, (state, action) => {
        return state;
      })
      .addCase(authenticateCredential.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else {
          state.currentUser = action.payload;
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else {
          state.currentUser = action.payload;
          state.isLoggedIn = true;
          if (action.payload.role === "Admin") {
            state.isAdmin = true;
          }
        }
      });
  },
});
const userReducer = userSlice.reducer;
export const {logoutUser} = userSlice.actions;
export default userReducer;
