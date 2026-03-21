import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

// Components & Pages
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";

function NavigationWrapper() {
  const location = useLocation();
  const jobDetails = useSelector((state) => state.jobs.jobs);

  // Define paths where you DON'T want the NavBar to appear
  const hideNavBarPaths = ["/login", "/register"];

  return (
    <>
      {/* Only show NavBar if current path is NOT in the hide list */}
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route path="/" element={<Home jobDetails={jobDetails} />} />
        <Route path="/jobs-list" element={<Jobs jobDetails={jobDetails} />} />
        <Route path="/profile-dashboard" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <NavigationWrapper />
    </Router>
  );
}
