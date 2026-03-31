import React from "react";
import SeekNav from "./jobseeker_components/SeekNav";
import EmpNav from "./employer_components/EmpNav";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const userType = currentUser?.userType;
  return (
    <>
      {userType === "jobseeker" && <SeekNav />}
      {userType === "employer" && <EmpNav />}
    </>
  );
};

export default NavBar;
