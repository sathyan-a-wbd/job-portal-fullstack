import React, { useEffect } from "react";
import Jobcard from "../components/Jobcard";
import JobDetails from "./JobDetails";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, resetApplyStatus } from "../redux/jobs/jobSlice";

import { toast } from "react-hot-toast";
const Jobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        await dispatch(getAllJobs()).unwrap();
        dispatch(resetApplyStatus());
      } catch (err) {
        toast.error("Error fetching jobs:", err);
      }
    };
    fetchAllJobs();
  }, []);
  const [searchParams] = useSearchParams();
  const { jobs = [] } = useSelector((state) => state.jobs);
  const selectedJob = useSelector((state) => state.jobs.selectedJob);
  const displayJob = selectedJob || jobs[0];
  const searchedJobs = useSelector((state) => state.jobs.searchedJobs);

  const filteredJobs = jobs.filter((job) => {
    const queryTitle = searchedJobs?.jobTitle?.toLowerCase() || "";
    const queryLocation = searchedJobs?.location?.toLowerCase() || "";

    const matchesTitle =
      job?.title?.toLowerCase().includes(queryTitle) ||
      job?.companyName?.toLowerCase().includes(queryTitle) ||
      job?.description?.toLowerCase().includes(queryTitle) ||
      job?.skills?.some((skill) => skill.toLowerCase().includes(queryTitle));

    const matchesLocation = job?.location
      ?.toLowerCase()
      .includes(queryLocation);

    return matchesTitle && matchesLocation;
  });
  const id = searchParams.get("job_id");
  return (
    <section className="grid grid-cols-1 items-center w-full gap-10 px-0 md:px-10 ">
      <div className="flex flex-col md:flex-row md:ring-1 md:ring-[#bcd4e6]/30 sm:py-5 rounded-xl ">
        <div
          className={`md:h-screen ${id ? "sc" : "block"} md:block md:overflow-y-scroll custom-scroll w-full md:w-[45%] px-4 md:px-8 md:border-r-2  md:border-[#bcd4e6]/30 md:shadow-lg rounded-sm`}
        >
          <h3 className="my-5 poppins flex gap-2 items-center text-md text-gray-700">
            <span className="font-light">{filteredJobs.length}+</span> jobs for
            you
          </h3>
          <div className={` grid grid-cols-1 md:grid-cols-1 gap-8 relative`}>
            {filteredJobs.map((job) => (
              <Jobcard key={job._id} jobDetails={job} />
            ))}
          </div>
        </div>

        <div
          className={`${selectedJob ? "block" : "hidden"} w-full md:w-[55%] md:block py-1 px-2`}
        >
          <JobDetails jobDetails={jobs} defaultJob={filteredJobs[0]} />
        </div>
      </div>
    </section>
  );
};

export default Jobs;
