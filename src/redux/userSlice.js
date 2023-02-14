import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    dispatch(loginFailure());
  }
};
const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.removeItem("root");
    });
  },
});

export const { loginStart, loginSuccess, loginFailure, resetUser } =
  userSlice.actions;
export default userSlice.reducer;
