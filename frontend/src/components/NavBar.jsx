import React from "react";
import SeekNav from "./Jobseeker/SeekNav";
import EmpNav from "./Employer/EmpNav";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const userType = currentUser?.userType;
  return (
    <>
      {userType === "employer" ?
        <EmpNav />
      : <SeekNav />}
    </>
  );
};

export default NavBar;
