import React, { useState } from "react";
import Jobs from "./Jobs";
import NavbarProfileDashboard from "../components/NavbarProfileDashboard";
import JobDetails from "../pages/JobDetails";
import Jobcard from "../components/Jobcard";
import { Link } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { TbPencil } from "react-icons/tb";

const Home = ({ jobDetails }) => {
  const [userStatus, setUserStatus] = useState(true);

  return (
    <section className="grid grid-cols-1 items-center w-full gap-5  lg:px-20 py-10">
      <div className="hidden sm:flex items-center justify-center px-10">
        <NavbarProfileDashboard userStatus={userStatus} />
      </div>
      <Jobs jobDetails={jobDetails} />
    </section>
  );
};

export default Home;
