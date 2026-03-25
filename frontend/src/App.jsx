import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
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

export default function App() {
  const jobDetails = useSelector((state) => state.jobs.jobs);

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
