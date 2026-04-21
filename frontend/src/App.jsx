import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./utils/ProtectedRoute";
//Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
// Components & Pages

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileEdit from "./components/ProfileEdit";
import GlobalLoader from "./components/GlobalLoader";

import { getProfile } from "./redux/user/authSlice";

import EmployerRegister from "./components/Employer/EmpRegister";
import EmpJobActions from "./components/Employer/EmpJobActions";
import EmpJobPost from "./components/Employer/EmpJobPost";
import { getMyJobs } from "./redux/jobs/jobSlice";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Applicants from "./pages/Applicants";
export default function App() {
  const jobDetails = useSelector((state) => state.jobs.jobs);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchProfile() {
      try {
        await dispatch(getProfile()).unwrap();
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
    async function fetchJobs() {
      try {
        await dispatch(getMyJobs()).unwrap();
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchJobs();
  }, [dispatch]);

  return (
    <>
      <GlobalLoader />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home jobDetails={jobDetails} />} />
          <Route path="/jobs-list" element={<Jobs jobDetails={jobDetails} />} />

          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/empregister" element={<EmployerRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/profile-dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-edit"
            element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emp-job-actions"
            element={
              <ProtectedRoute>
                <EmpJobActions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post-job"
            element={
              <ProtectedRoute>
                <EmpJobPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applicants/:jobId"
            element={
              <ProtectedRoute>
                <Applicants />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
