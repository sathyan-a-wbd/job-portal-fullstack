import React from "react";
import Jobcard from "../components/Jobcard";
import JobDetails from "./JobDetails";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Jobs = ({ jobDetails }) => {
  const [searchParams] = useSearchParams();
  const selectedJob = useSelector((state) => state.jobs.selectedJob);
  console.log(selectedJob);
  const isSelectedJob = !!selectedJob;
  const id = searchParams.get("jobidelmentrfid");
  return (
    <section className="grid grid-cols-1 items-center w-full gap-10 px-0 md:px-10 ">
      <div className="flex flex-col md:flex-row md:ring-1 md:ring-[#bcd4e6]/30 sm:py-5 rounded-xl ">
        <div
          className={`md:h-screen ${id ? "sc" : "block"} md:block md:overflow-y-scroll custom-scroll w-full md:w-[45%] px-4 md:px-8 md:border-r-2  md:border-[#bcd4e6]/30 md:shadow-lg rounded-sm py-5`}
        >
          <h3 className="my-5 font-semibold text-lg text-gray-700">
            Jobs for you
          </h3>
          <Jobcard jobDetails={jobDetails} />
        </div>
        <div className={`w-full md:w-[55%]  md:block py-1 px-2`}>
          {isSelectedJob && <JobDetails jobDetails={jobDetails} />}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
