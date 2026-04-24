import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/newApi";

export const getApplicants = createAsyncThunk(
  "applicant/getApplicants",
  async (jobId, thunkAPI) => {
    try {
      console.log(jobId);
      const res = await API.get(`/api/applications/job/${jobId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const getEachApp = createAsyncThunk(
  "applicant/getEachApp",
  async (userId, thunkAPI) => {
    try {
      console.log(userId);
      const res = await API.get(`/api/applicants/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

const initialState = {
  applicants: null,
  currentApp: null,
  loading: false,
  error: null,
};

const applicantSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplicants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload.merged;
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEachApp.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEachApp.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApp = action.payload;
      })
      .addCase(getEachApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default applicantSlice.reducer;
