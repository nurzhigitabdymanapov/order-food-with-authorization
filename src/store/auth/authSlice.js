import { createSlice } from "@reduxjs/toolkit";
import { signInRequest, signUpRequest } from "./authThunk";
import { STORAGE_KEY } from "../../constants";

const getInitialState = () => {
  const json = localStorage.getItem(STORAGE_KEY.AUTH);
  if (json) {
    const userData = JSON.parse(json);
    return {
      isAuthorization: true,
      token: userData.data.token,
      user: {
        name: userData.data.user.name,
        email: userData.data.user.email,
        role: userData.data.user.role,
      },
    };
  }
  return {
    isAuthorization: false,
    token: "",
    user: {
      email: "",
      name: "",
      role: "",
    },
  };
};

const initialState = getInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthorization = false;
      state.token = "";
      state.user = {
        name: "",
        email: "",
        password: "",
        id: "",
      };
      return localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpRequest.fulfilled, (state, action) => {
        state.isAuthorization = true;
        state.token = action.token;
      })
      .addCase(signUpRequest.pending, (state) => {})
      .addCase(signUpRequest.rejected, (state, action) => {})
      .addCase(signInRequest.fulfilled, (state, action) => {
        state.isAuthorization = true;
        state.token = action.token;
      })
      .addCase(signInRequest.pending, (state) => {
        state.isAuthorization = false;
      });
  },
});

export const authActions = authSlice.actions;
