import { createSlice } from "@reduxjs/toolkit";
import { GetProfile } from "../../services/api";

const initialState = {
  currentUser: null,
  loading: true,
  isLogin: false,
  errors: null,
  userEdit: localStorage.getItem("userEdit") || "",
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserRedux: (state, action) => {
      state.currentUser = action.payload;
    },
    setUserEdit: (state, action) => {
      state.userEdit = action.payload;
      localStorage.setItem("userEdit", action.payload);
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const {
  setIsLogin,
  setErrors,
  setUserRedux,
  setUserId,
  setUserEdit,
  setLoading,
} = userSlice.actions;
export default userSlice.reducer;
