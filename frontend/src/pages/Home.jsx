import React, { useEffect } from "react";

import { setLoading } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import JobseekerHome from "../components/jobseeker_components/JobseekerHome";
import EmpHome from "../components/employer_components/EmpHome";

const Home = ({ jobDetails }) => {
  const currentUser = useSelector((state) => state.users.currentUser);
  console.log(currentUser);

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
