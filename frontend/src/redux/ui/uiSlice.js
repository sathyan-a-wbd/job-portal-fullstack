import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loadingCount: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.loading = true;
        state.loadingCount += 1;
      })
      .addMatcher(isFulfilled, (state) => {
        state.loadingCount -= 1;
        if (state.loadingCount === 0) {
          state.loading = false;
        }
      })
      .addMatcher(isRejected, (state) => {
        state.loadingCount -= 1;
        if (state.loadingCount === 0) {
          state.loading = false;
        }
      });
  },
});

export default uiSlice.reducer;
