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
export default function App() {
  const [jobDetails, setJobDetails] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Zoho Corporation",
      companyImg: "https://logo.clearbit.com/zoho.com",
      experience: "0-2 years",
      location: "Chennai",
      description:
        "Looking for a frontend developer skilled in React, HTML, CSS, and JavaScript to build responsive web applications.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      responsibilities: [
        "Develop front-end using technologies like React, Angular, or Vue.js.",
        "Collaborate with UI/UX designers to implement design into code.",
        "Optimize applications for maximum speed and scalability.",
        "Participate in code reviews and team meetings.",
        "Ensure application performance, security, and scalability.",
      ],
      workLocation: "Remote",
      posted: "2 days ago",
      saved: false,
      salary: "50000 - 100000",
      industryType: "IT & Consulting",
      department: "Engineering - Software & QA",
      employmentType: "Full Time, Permanent",
      roleCategory: "Software Development",
    },
    {
      id: 2,
      title: "React Developer",
      company: "Infosys",
      companyImg: "https://logo.clearbit.com/infosys.com",
      experience: "1-3 years",
      location: "Bangalore",
      workLocation: "Remote",

      description:
        "Work on modern UI applications using React.js and Tailwind CSS. Good understanding of hooks is required.",
      skills: ["React", "Tailwind", "JavaScript"],
      responsibilities: [
        "Develop front-end using technologies like React, Angular, or Vue.js.",
        "Collaborate with UI/UX designers to implement design into code.",
        "Optimize applications for maximum speed and scalability.",
        "Participate in code reviews and team meetings.",
        "Ensure application performance, security, and scalability.",
      ],
      posted: "1 day ago",
      saved: true,
      salary: "70000 - 100000",
      education: "Bachelor's degree in Computer Science or related field",
      industryType: "IT & Consulting",
      department: "Engineering - Software & QA",
      employmentType: "Full Time, Permanent",
      roleCategory: "Software Development",
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "TCS",
      companyImg: "",
      experience: "0-1 years",
      location: "Hyderabad",
      workLocation: "In person",

      description:
        "Entry-level role for freshers with knowledge in HTML, CSS, and basic JavaScript.",
      skills: ["HTML", "CSS", "JavaScript"],
      responsibilities: [
        "Develop front-end using technologies like React, Angular, or Vue.js.",
        "Collaborate with UI/UX designers to implement design into code.",
        "Optimize applications for maximum speed and scalability.",
        "Participate in code reviews and team meetings.",
        "Ensure application performance, security, and scalability.",
      ],
      posted: "3 days ago",
      saved: false,
      salary: "80000 - 300000",
      education: "Bachelor's degree in Computer Science or related field",
      industryType: "IT & Consulting",
      department: "Engineering - Software & QA",
      employmentType: "Full Time, Permanent",
      roleCategory: "Software Development",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "Wipro",
      companyImg: "https://logo.clearbit.com/wipro.com",
      experience: "2-4 years",
      location: "Pune",
      workLocation: "In person",

      description:
        "Looking for MERN stack developers to build scalable applications with Node.js and MongoDB.",
      skills: ["MongoDB", "Express", "React", "Node"],
      responsibilities: [
        "Develop front-end using technologies like React, Angular, or Vue.js.",
        "Collaborate with UI/UX designers to implement design into code.",
        "Optimize applications for maximum speed and scalability.",
        "Participate in code reviews and team meetings.",
        "Ensure application performance, security, and scalability.",
      ],
      posted: "5 days ago",
      saved: true,
      salary: "500000 - 100000",
      education: "Bachelor's degree in Computer Science or related field",
      industryType: "IT & Consulting",
      department: "Engineering - Software & QA",
      employmentType: "Full Time, Permanent",
      roleCategory: "Software Development",
    },
    {
      id: 5,
      title: "UI Developer",
      company: "Freshworks",
      companyImg: "https://logo.clearbit.com/freshworks.com",
      experience: "1-2 years",
      location: "Chennai",
      workLocation: "In person",

      description:
        "Build clean and modern UI using Tailwind CSS and React. Focus on performance and UX.",
      skills: ["React", "Tailwind", "UI/UX"],
      responsibilities: [
        "Develop front-end using technologies like React, Angular, or Vue.js.",
        "Collaborate with UI/UX designers to implement design into code.",
        "Optimize applications for maximum speed and scalability.",
        "Participate in code reviews and team meetings.",
        "Ensure application performance, security, and scalability.",
      ],
      posted: "4 days ago",
      saved: false,
      salary: "50000 - 200000",
      education: "Bachelor's degree in Computer Science or related field",
      industryType: "IT & Consulting",
      department: "Engineering - Software & QA",
      employmentType: "Full Time, Permanent",
      roleCategory: "Software Development",
    },
  ]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Home jobDetails={jobDetails} />} />
        <Route path={"/jobs-list"} element={<Jobs jobDetails={jobDetails} />} />
        <Route
          path={"/jobs-list/:id"}
          element={<Jobs jobDetails={jobDetails} />}
        />

        <Route path={"/profile-dashboard"} element={<Dashboard />} />
        <Route path={"/notifications"} element={<Notifications />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/login"} element={<Register />} />
      </Routes>
    </Router>
  );
}
