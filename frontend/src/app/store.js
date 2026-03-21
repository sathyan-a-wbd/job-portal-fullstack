import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../features/jobs/jobSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    users: userReducer,
  },
});
