import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../redux/jobs/jobSlice";
import userReducer from "../redux/user/userSlice";
import authReducer from "../redux/user/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    users: userReducer,
  },
});
