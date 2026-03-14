import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//pages and components
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/jobs-list"} element={<Jobs />} />
        <Route path={"/profile-dashboard"} element={<Dashboard />} />
        <Route path={"/notifications"} element={<Notifications />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/login"} element={<Register />} />
      </Routes>
    </Router>
  );
}
