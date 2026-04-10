import React from "react";

import { useSelector } from "react-redux";

import EmpHome from "../components/Employer/EmpHome";
import JobseekerHome from "../components/Jobseeker/JobseekerHome";

const Home = ({ jobDetails }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const userType = currentUser?.userType;

  return (
    <>
      {userType === "employer" ?
        <EmpHome />
      : <JobseekerHome jobDetails={jobDetails} />}
    </>
  );
};

export default Home;
