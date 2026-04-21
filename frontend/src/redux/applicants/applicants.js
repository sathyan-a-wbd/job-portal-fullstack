import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/newApi";

export const getApplicants = createAsyncThunk(
  "applicant/getApplicants",
  async (jobId, thunkAPI) => {
    try {
        console.log(jobId)
      const res = await API.get(`/api/applications/job/${jobId}`);
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
      });
  },
});
export default applicantSlice.reducer;
