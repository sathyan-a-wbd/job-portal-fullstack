import React from "react";
import NavbarProfileDashboard from "../NavbarProfileDashboard";

const EmpHome = () => {
  return (
    <section className="grid grid-cols-1 items-center w-full gap-2  lg:px-20 py-10">
      <div className="hidden sm:flex items-center justify-center px-10">
        <NavbarProfileDashboard />
      </div>
      {/* <Jobs jobDetails={jobDetails} /> */}
    </section>
  );
};

export default EmpHome;
