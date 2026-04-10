import React, { useEffect } from "react";

import { setLoading } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import NavbarProfileDashboard from "../NavbarProfileDashboard";
import Jobs from "../../pages/Jobs";

const JobseekerHome = ({ jobDetails }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <section className="grid grid-cols-1 items-center w-full gap-2  lg:px-20 py-4">
      <div className="hidden sm:flex items-center justify-center px-10">
        <NavbarProfileDashboard />
      </div>
      <Jobs jobDetails={jobDetails} />
    </section>
  );
};

export default JobseekerHome;
