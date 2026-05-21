import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/newApi";

export const getApplicants = createAsyncThunk(
  "applicant/getApplicants",
  async (jobId, thunkAPI) => {
    try {
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
      const res = await API.get(`/api/applicants/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const updateAppStatus = createAsyncThunk(
  "applicant/updateAppStatus",
  async ({ appId, status }, thunkAPI) => {
    try {
      const res = await API.patch(`/api/applications/${appId}/status`, {
        status,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const getJobSeekerApplications = createAsyncThunk(
  "applicant/getJobSeekerApplications",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/api/my-applications");

      return res.data.applications;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);
const initialState = {
  applicants: [],
  currentApp: null,
  updatingStatusId: null,
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
      })
      .addCase(updateAppStatus.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.updatingStatusId = action.meta.arg.appId;
      })

      .addCase(updateAppStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.updatingStatusId = null;

        const updatedApplication = action.payload.application;

        state.applicants = state.applicants.map((app) =>
          app._id === updatedApplication._id ?
            {
              ...app,
              status: updatedApplication.status,
            }
          : app,
        );
      })

      .addCase(updateAppStatus.rejected, (state, action) => {
        state.loading = false;
        state.updatingStatusId = null;
        state.error = action.payload;
      })
      .addCase(getJobSeekerApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobSeekerApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(getJobSeekerApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default applicantSlice.reducer;
