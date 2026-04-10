import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/newApi";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/api/users/register", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/api/users/login", data);
      localStorage.setItem("token", res.data.token);
      return res.data.token;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);
//  GET PROFILE
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/api/users/profile");
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);
//  UPDATE USER
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const res = await API.put("/api/users/profile", userData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);
//  UPLOAD RESUME
export const uploadResume = createAsyncThunk(
  "auth/uploadResume",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await API.put("/api/users/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);
//  DELETE RESUME
export const deleteResume = createAsyncThunk(
  "auth/deleteResume",
  async (_, thunkAPI) => {
    try {
      const res = await API.delete("/api/users/resume");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);
//  AI SUMMARY
export const generateSummary = createAsyncThunk(
  "auth/generateSummary",
  async (input, thunkAPI) => {
    try {
      const res = await API.post("/api/ai/generate-summary", input);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);
export const forgotPassword = createAsyncThunk(
  "auth/createUser",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/api/users/forgot-password", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    summary: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setCurrenUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PROFILE
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.currentUser = {
          ...action.payload.user,
          ...action.payload.profile,
        };
        state.loading = false;
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })

      // AI SUMMARY
      .addCase(generateSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(generateSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      //Upload resume
      .addCase(uploadResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.loading = false;

        if (state.currentUser) {
          state.currentUser.resume = action.payload.resume;
          state.currentUser.resumeName = action.payload.resumeName;
        }
      })
      //Delete resume
      .addCase(deleteResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteResume.fulfilled, (state) => {
        if (state.currentUser) {
          state.currentUser.resume = "";
          state.currentUser.resumeName = "";
        }
      });
  },
});

export const { logout, setCurrenUser } = authSlice.actions;
export default authSlice.reducer;
