import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLogin: false,
  errors: "",
  userId: "",
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setIsLogin, setErrors, setUserId } = userSlice.actions;
export default userSlice.reducer;
