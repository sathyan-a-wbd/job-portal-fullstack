import React, { useEffect } from "react";
import Jobcard from "../components/Jobcard";
import JobDetails from "./JobDetails";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, resetApplyStatus } from "../redux/jobs/jobSlice";

import { toast } from "react-hot-toast";
import JobCardSkeleton from "../components/Loaders/JobCardSkeleton";
import JobDetailsSkeleton from "../components/Loaders/JobDetailsSkeleton";
const Jobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        await dispatch(getAllJobs(1)).unwrap();
        dispatch(resetApplyStatus());
      } catch (err) {
        toast.error("Error fetching jobs:", err);
      }
    };
    fetchAllJobs();
  }, []);
  const [searchParams] = useSearchParams();
  const {
    jobs = [],
    loading,
    currentPage,
    hasNextPage,
  } = useSelector((state) => state.jobs);
  const { currentUser } = useSelector((state) => state.auth);
  const selectedJob = useSelector((state) => state.jobs.selectedJob);

  const searchedJobs = useSelector((state) => state.jobs.searchedJobs);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Jobs - Job Portal Application";
  }, []);
  const handleLoadMore = async () => {
    if (!hasNextPage || loading) return;

    try {
      await dispatch(getAllJobs(currentPage + 1)).unwrap();
    } catch (err) {
      toast.error("Failed to load more jobs");
    }
  };
  const filteredJobs =
    Array.isArray(jobs) ?
      jobs
        .map((job) => {
          let score = 0;

          const preferences = currentUser?.jobPrefrence || [];
          const queryTitle = searchedJobs?.jobTitle?.toLowerCase() || "";
          const queryLocation = searchedJobs?.location?.toLowerCase() || "";

          const title = job?.title?.toLowerCase() || "";
          const company = job?.companyName?.toLowerCase() || "";
          const desc = job?.description?.toLowerCase() || "";
          const location = job?.location?.toLowerCase() || "";
          const skills = job?.skills || [];

          preferences.forEach((pref) => {
            const p = pref.toLowerCase();

            if (title.includes(p)) score += 5;
            if (skills.some((s) => s.toLowerCase().includes(p))) score += 4;
          });

          if (queryTitle) {
            if (title.includes(queryTitle)) score += 5;
            if (company.includes(queryTitle)) score += 2;
            if (desc.includes(queryTitle)) score += 1;
            if (skills.some((s) => s.toLowerCase().includes(queryTitle)))
              score += 4;
          }

          if (queryLocation && location.includes(queryLocation)) {
            score += 2;
          }

          return { ...job, score };
        })
        .sort((a, b) => b.score - a.score)
    : [];
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
          <div
            className={` grid grid-cols-1 md:grid-cols-1 gap-8 my-4 relative`}
          >
            {loading ?
              Array.from({ length: 6 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            : filteredJobs.map((job) => (
                <Jobcard key={job._id} jobDetails={job} />
              ))
            }
            {hasNextPage && !loading && (
              <button
                onClick={handleLoadMore}
                className="w-full py-3 rounded-2xl border border-[#bcd4e6]
    hover:bg-[#f5f9ff] transition-all duration-300
    text-gray-700 font-medium"
              >
                Load More Jobs
              </button>
            )}
          </div>
        </div>

        <div
          className={`${selectedJob ? "block" : "hidden"} w-full md:w-[55%] md:block py-1 px-2`}
        >
          {loading ?
            <JobDetailsSkeleton />
          : <JobDetails jobDetails={jobs} defaultJob={filteredJobs[0]} />}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
