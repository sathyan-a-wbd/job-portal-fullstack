import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../redux/jobs/jobSlice";
import userReducer from "../redux/user/userSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    users: userReducer,
  },
});
