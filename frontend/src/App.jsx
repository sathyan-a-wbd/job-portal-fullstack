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
import { userThunk } from "./redux/user/userSlice";

export default function App() {
  const jobDetails = useSelector((state) => state.jobs.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userThunk());
  }, [dispatch]);
  return (
    <Routes>
      {/* Main Layout (with Navbar) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home jobDetails={jobDetails} />} />
        <Route path="/jobs-list" element={<Jobs jobDetails={jobDetails} />} />
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
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      {/* Auth Layout (NO Navbar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
