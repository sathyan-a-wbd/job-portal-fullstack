import React from "react";
import JobseekerDashboard from "../components/Jobseeker/JobseekerDashboard";
import { useSelector } from "react-redux";
import EmpDashBoard from "../components/Employer/EmpDashBoard";
import { useEffect } from "react";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const currentRole = currentUser?.userType;

  useEffect(() => {
    document.title = `${currentRole === "employer" ? "Employer" : "Jobseeker"} Dashboard - Job Portal`;
  }, [currentRole]);
  return (
    <>
      {currentRole === "employer" ?
        <EmpDashBoard />
      : <JobseekerDashboard />}
    </>
  );
};

export default Dashboard;
