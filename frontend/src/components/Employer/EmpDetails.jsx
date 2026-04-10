import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Jobcard from "../Jobcard";
import { useDispatch, useSelector } from "react-redux";
import TrailJobcard from "../TrailJobCard";
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdEdit, MdOutlinePreview } from "react-icons/md";
import JobDetails from "../../pages/JobDetails";
import { toast } from "react-hot-toast";
import { deleteJob, getMyJobs } from "../../redux/jobs/jobSlice";

const EmpDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        await dispatch(getMyJobs()).unwrap();
      } catch (err) {
        toast.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, [dispatch]);

  const { jobs = [] } = useSelector((state) => state.jobs);

  const [active, setActive] = useState("posted");
  const tabs = ["posted", "application", "extra"];
  const [search, setSearch] = useState("");
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (confirmDelete) {
      try {
        await dispatch(deleteJob(id)).unwrap();
        await dispatch(getMyJobs()).unwrap();
        toast.success("Job Deleted");
      } catch (err) {
        toast.error("Failed to delete job", err);
      }
    }
  };
  const filteredJobs = jobs.filter((job) => {
    const query = search.toLowerCase();

    return (
      job.title?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.companyName?.toLowerCase().includes(query)
    );
  });
  // const handleSearchJobs = () => {};
  return (
    <section className=" poppins grid grid-cols-1 items-center w-full gap-10 px-0 md:px-10 ">
      <div className="flex flex-col gap-4 md:ring-1 bg-white md:ring-[#bcd4e6]/30  rounded-xl ">
        {/* Tabs */}
        <div className="justify-between gap-4 pt-2 px-6 flex sm:flex-row flex-col sm:items-center">
          <div className="flex items-end gap-2">
            <hr className="" />
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative px-5 py-2 poppins text-xs cursor-pointer border-t capitalize transition-all
              ${
                active === tab ?
                  "bg-white text-black rounded-t-xl border-[#4485fd] rounded-b-none"
                : "bg-gray-100 text-gray-600 hover:border-[#4485fd] border-[#bcd4e6] rounded-lg"
              }
            `}
              >
                {tab}

                {/* Curve effect */}
              </div>
            ))}

            <hr />
          </div>
          <div className="rounded-full border-none px-4 flex items-center outline-none ring-1 ring-gray-300">
            <IoSearch />

            {active === "posted" && (
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${active} jobs`}
                className="border-none px-4 py-2 poppins outline-none"
              />
            )}
            {active === "application" && (
              <input
                type="text"
                placeholder={`Search ${active}`}
                className=" border-none px-4 py-2 poppins outline-none"
              />
            )}
            {active === "extra" && (
              <input
                type="text"
                placeholder={`Search ${active}`}
                className=" border-none px-4 py-2 poppins outline-none"
              />
            )}
          </div>
        </div>
        {/* Content Box */}
        <div className="px-6 py-2 w-full max-h-screen overflow-y-scroll custom-scroll">
          {jobs.length === 0 && <p>No jobs found</p>}
          {active === "posted" && (
            <div className={` grid grid-cols-1 md:grid-cols-2 gap-8 relative`}>
              {filteredJobs?.map((job) => (
                <div key={job._id}>
                  <div className="w-full mb-0.5 flex items-center justify-end px-6">
                    <div className="flex gap-3 text-gray-600 py-2 bg-gray-100 rounded-t-2xl px-4">
                      {/* View */}
                      <div className="relative group">
                        <Link
                          to={`/emp-job-actions?type=view&job_id=${job._id}`}
                        >
                          <MdOutlinePreview
                            className="cursor-pointer"
                            size={18}
                          />
                        </Link>
                        <span
                          className="absolute  z-20 left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap 
        bg-black text-white text-xs px-2 py-1 rounded 
        opacity-0 group-hover:opacity-100 transition"
                        >
                          View
                        </span>
                      </div>

                      {/* Edit */}
                      <div className="relative group">
                        <Link
                          to={`/emp-job-actions?type=edit&job_id=${job._id}`}
                        >
                          <MdEdit className="cursor-pointer" size={18} />
                        </Link>
                        <span
                          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap 
        bg-black text-white text-xs px-2 py-1 rounded 
        opacity-0 group-hover:opacity-100 transition"
                        >
                          Edit
                        </span>
                      </div>

                      {/* Delete */}
                      <div className="relative group">
                        <MdDelete
                          onClick={() => handleDelete(job._id)}
                          className="cursor-pointer"
                          size={18}
                        />
                        <span
                          className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap 
        bg-black text-white text-xs px-2 py-1 rounded 
        opacity-0 group-hover:opacity-100 transition"
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                  <Jobcard jobDetails={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmpDetails;
