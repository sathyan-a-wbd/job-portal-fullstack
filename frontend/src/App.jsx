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

export default function App() {
  const jobDetails = useSelector((state) => state.jobs.jobs);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchProfile() {
      try {
        await dispatch(getProfile()).unwrap();
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    }
    fetchProfile();
  }, [dispatch]);

  return (
    <>
      <GlobalLoader />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home jobDetails={jobDetails} />} />
          <Route path="/jobs-list" element={<Jobs jobDetails={jobDetails} />} />

          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
