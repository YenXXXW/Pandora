import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCredentials: (state, action ) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = postSlice.actions;

export default postSlice.reducer;
