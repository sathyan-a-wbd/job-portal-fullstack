import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchResumeAPI,
  uploadResumeAPI,
  updateResumeAPI,
  deleteResumeAPI,
} from "../../services/resumeService";

// ── Async Thunks ──────────────────────────────────────────────────────────────

export const fetchResume = createAsyncThunk(
  "resume/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await fetchResumeAPI();
      // Support both { data: { resumeUrl } } and { resumeUrl } shapes
      return data?.data ?? data ?? {};
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch resume",
      );
    }
  },
);

export const uploadResume = createAsyncThunk(
  "resume/upload",
  async (file, { rejectWithValue }) => {
    try {
      const { data } = await uploadResumeAPI(file);
      return data?.data ?? data ?? {};
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Upload failed");
    }
  },
);

export const updateResume = createAsyncThunk(
  "resume/update",
  async (file, { rejectWithValue }) => {
    try {
      const { data } = await updateResumeAPI(file);
      return data?.data ?? data ?? {};
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  },
);

export const deleteResume = createAsyncThunk(
  "resume/delete",
  async (_, { rejectWithValue }) => {
    try {
      await deleteResumeAPI();
      return null;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  },
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumeUrl: null,
    resumeName: null,
    resumePublicId: null,
    hasResume: false,
    loading: false,
    actionLoading: false, // for upload / update / delete
    error: null,
    successMsg: null,
  },
  reducers: {
    clearResumeMessages(state) {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetch ──
    builder
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.loading = false;
        const p = action.payload ?? {};
        state.resumeUrl = p.resumeUrl ?? null;
        state.resumeName = p.resumeName ?? null;
        state.resumePublicId = p.resumePublicId ?? null;
        state.hasResume = p.hasResume ?? false;
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── upload ──
    builder
      .addCase(uploadResume.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.actionLoading = false;
        const p = action.payload ?? {};
        state.resumeUrl = p.resumeUrl ?? null;
        state.resumeName = p.resumeName ?? null;
        state.resumePublicId = p.resumePublicId ?? null;
        state.hasResume = true;
        state.successMsg = "Resume uploaded successfully!";
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });

    // ── update ──
    builder
      .addCase(updateResume.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.actionLoading = false;
        const p = action.payload ?? {};
        state.resumeUrl = p.resumeUrl ?? null;
        state.resumeName = p.resumeName ?? null;
        state.resumePublicId = p.resumePublicId ?? null;
        state.hasResume = true;
        state.successMsg = "Resume updated! Old resume deleted.";
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });

    // ── delete ──
    builder
      .addCase(deleteResume.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.successMsg = null;
      })
      .addCase(deleteResume.fulfilled, (state) => {
        state.actionLoading = false;
        state.resumeUrl = null;
        state.resumeName = null;
        state.resumePublicId = null;
        state.hasResume = false;
        state.successMsg = "Resume deleted successfully.";
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResumeMessages } = resumeSlice.actions;
export default resumeSlice.reducer;
