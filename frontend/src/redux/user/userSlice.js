import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetProfile } from "../../services/api";

export const userThunk = createAsyncThunk(
  "users/fetchProfile",
  async (_, thunkApi) => {
    try {
      const res = await GetProfile();
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Error");
    }
  },
);

const initialState = {
  user: null,
  loading: false,
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
      .addCase(userThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userThunk.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const { setIsLogin, setErrors, setUserId, setUserEdit, logout } =
  userSlice.actions;
export default userSlice.reducer;
