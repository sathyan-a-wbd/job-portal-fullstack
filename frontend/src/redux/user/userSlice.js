import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetProfile } from "../../services/api";

const initialState = {
  currentUser: null,
  loading: true,
  isLogin: false,
  errors: null,
  userEdit: localStorage.getItem("userEdit") || "",
};
export const fetchUserData = createAsyncThunk("app/fetchUserData", async () => {
  const response = await GetProfile();

  return response;
});
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error.message;
      });
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
