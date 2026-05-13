import React from "react";

import NavbarProfileDashboard from "../NavbarProfileDashboard";
import Jobs from "../../pages/Jobs";
import { useSelector } from "react-redux";
import NavbarProfileDashboardSkeleton from "../Loaders/NavbarProfileDashboardSkeleton";

const JobseekerHome = ({ jobDetails }) => {
  const { loading } = useSelector((state) => state.auth);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="grid grid-cols-1 items-center w-full gap-2  lg:px-20 py-4">
      <div className="hidden sm:flex items-center justify-center px-10">
        {loading ?
          <NavbarProfileDashboardSkeleton />
        : <NavbarProfileDashboard />}
      </div>
      <Jobs jobDetails={jobDetails} />
    </section>
  );
};

export default JobseekerHome;
