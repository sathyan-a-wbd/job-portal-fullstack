import React from "react";
import Jobcard from "../components/Jobcard";
import JobDetails from "./JobDetails";
import { useParams } from "react-router-dom";
const Jobs = ({ jobDetails }) => {
  const id = useParams().id;
  return (
    <section className="grid grid-cols-1 items-center w-full gap-10 px-0 md:px-10 ">
      <div className="flex flex-col md:flex-row md:ring-1 md:ring-[#bcd4e6]/30 py-5 rounded-xl ">
        <div
          className={`md:h-screen ${id ? "hidden" : "block"} md:block md:overflow-y-scroll custom-scroll w-full md:w-[45%] md:px-8 md:border-r-2  md:border-[#bcd4e6]/30 md:shadow-lg rounded-sm py-5`}
        >
          <Jobcard jobDetails={jobDetails} />
        </div>
        <div
          className={`w-full md:w-[55%] ${id ? "block" : "hidden"} md:block px-2`}
        >
          <JobDetails jobDetails={jobDetails} />
        </div>
      </div>
    </section>
  );
};

export default Jobs;
