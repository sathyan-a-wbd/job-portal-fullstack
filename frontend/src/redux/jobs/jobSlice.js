import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/newApi";

export const createJob = createAsyncThunk(
  "job/createJob",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/api/jobs/create-job", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getMyJobs = createAsyncThunk(
  "job/getMyJobs",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/api/jobs/my-jobs-employer");

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const getAllJobs = createAsyncThunk(
  "job/getAllJobs",
  async (page = 1, thunkAPI) => {
    try {
      const res = await API.get(`/api/jobs/all-jobs?page=${page}&limit=10`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.put(`/api/jobs/update-job/${id}`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const applyToJob = createAsyncThunk(
  "job/apply",
  async ({ jobId }, { rejectWithValue }) => {
    try {
      const res = await API.post(`/api/jobs/${jobId}/apply`, {}, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Application failed",
      );
    }
  },
);
export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/api/jobs/delete-job/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
export const saveJob = createAsyncThunk(
  "jobs/saveJob",
  async (jobId, thunkAPI) => {
    try {
      const res = await API.post(
        `/api/jobs/save/${jobId}`,
        {},
        {
          withCredentials: true,
        },
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
export const getSavedJobs = createAsyncThunk(
  "jobs/getSavedJobs",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/api/saved-jobs/saved");

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
const initialState = {
  jobs: [],
  searchedJobs: { jobTitle: "", location: "" },
  savedJobs: [],
  loading: false,
  error: null,
  applyStatus: "idle",
  applyError: null,
  selectedJob: false,

  // PAGINATION
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setSearchedJobs: (state, action) => {
      state.searchedJobs = action.payload;
    },
    resetApplyStatus: (state) => {
      state.applyStatus = "idle";
      state.applyError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.unshift(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.pagination.currentPage === 1) {
          state.jobs = action.payload.jobs;
        } else {
          state.jobs = [...state.jobs, ...action.payload.jobs];
        }

        state.currentPage = action.payload.pagination.currentPage;

        state.totalPages = action.payload.pagination.totalPages;

        state.hasNextPage = action.payload.pagination.hasNextPage;
      })

      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job,
        );
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter((job) => job._id !== action.meta.arg);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyToJob.pending, (state) => {
        state.applyStatus = "loading";
      })
      .addCase(applyToJob.fulfilled, (state) => {
        state.applyStatus = "applied";
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.applyStatus = "error";
        state.applyError = action.payload;
      })
      .addCase(saveJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.map((job) =>
          job._id === action.payload.job ? { ...job, saved: true } : job,
        );
      })
      .addCase(saveJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSavedJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSavedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.savedJobs = action.payload.savedJobs;
        console.log(action.payload.savedJobs);
      })
      .addCase(getSavedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setJobs, setSelectedJob, setSearchedJobs, resetApplyStatus } =
  jobSlice.actions;
export default jobSlice.reducer;
