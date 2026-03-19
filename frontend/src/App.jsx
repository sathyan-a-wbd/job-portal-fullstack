import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

//pages and components
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import { useSelector } from "react-redux";
export default function App() {
  const jobDetails = useSelector((state) => state.jobs.jobs);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Home jobDetails={jobDetails} />} />

        <Route path={"/jobs-list"} element={<Jobs jobDetails={jobDetails} />} />

        <Route path={"/profile-dashboard"} element={<Dashboard />} />
        <Route path={"/notifications"} element={<Notifications />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/login"} element={<Register />} />
      </Routes>
    </Router>
  );
}
