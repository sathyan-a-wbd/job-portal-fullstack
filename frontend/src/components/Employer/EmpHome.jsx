import React from "react";
import NavbarProfileDashboard from "../NavbarProfileDashboard";
import { useSelector } from "react-redux";
import EmpDetails from "./EmpDetails";

const EmpHome = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <section className="grid grid-cols-1 items-center w-full gap-2  lg:px-20 py-4">
      <div className="hidden sm:flex items-center justify-center px-10">
        <NavbarProfileDashboard />
      </div>
      <EmpDetails />
    </section>
  );
};

export default EmpHome;
