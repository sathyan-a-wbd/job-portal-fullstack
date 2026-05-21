import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../redux/jobs/jobSlice";
// import userReducer from "../redux/user/userSlice";
import authReducer from "../redux/user/authSlice";
import uiReducer from "../redux/ui/uiSlice";
import applicantReducer from "../redux/applicants/applicants";
import resumeReducer from "../redux/resume/resumeSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    // users: userReducer,
    ui: uiReducer,
    applicant: applicantReducer,
    resume: resumeReducer,
  },
});
