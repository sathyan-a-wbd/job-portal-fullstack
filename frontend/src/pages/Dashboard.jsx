import React from "react";
import JobseekerDashboard from "../components/Jobseeker/JobseekerDashboard";
import { useSelector } from "react-redux";
import EmpDashBoard from "../components/Employer/EmpDashBoard";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const currentRole = currentUser?.userType;
  return (
    <>
      {currentRole === "employer" ?
        <EmpDashBoard />
      : <JobseekerDashboard />}
    </>
  );
};

export default Dashboard;
