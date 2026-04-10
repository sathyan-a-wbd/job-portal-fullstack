import React, { useEffect } from "react";

import { setLoading } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import EmpHome from "../components/Employer/EmpHome";
import JobseekerHome from "../components/Jobseeker/JobseekerHome";

const Home = ({ jobDetails }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const userType = currentUser?.userType;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <>
      {userType === "employer" ?
        <EmpHome />
      : <JobseekerHome jobDetails={jobDetails} />}
    </>
  );
};

export default Home;
