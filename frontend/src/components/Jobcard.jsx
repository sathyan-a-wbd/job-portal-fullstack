import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { LuBookText } from "react-icons/lu";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

import { LiaWalletSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { saveJob, setSelectedJob, unsaveJob } from "../redux/jobs/jobSlice";
import { getRelativeTime } from "../utils/getRelativeTIme";

const Jobcard = ({ jobDetails }) => {
  const locationUrl = useLocation();
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const userType = currentUser?.userType;
  const job = jobDetails;

  const { savedJobs = [] } = useSelector((state) => state.jobs);
  const isSaved = savedJobs.some((saved) => saved?.job?._id === jobDetails._id);
  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isSaved) {
        await dispatch(unsaveJob(jobDetails._id)).unwrap();
      } else {
        await dispatch(saveJob(jobDetails._id)).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) return null;
  return (
    <div className="bg-white ">
      {job && (
        <Link
          onClick={() => dispatch(setSelectedJob(true))}
          replace
          to={
            userType === "employer" ?
              `${locationUrl.pathname}`
            : `${locationUrl.pathname}?job_id=${job._id}`
          }
          state={{ fromList: true }}
          key={job._id}
          className=" sm:bg-[#ffff] flex flex-col gap-5 cursor-pointer  w-full tracking-wide rounded-xl sm:rounded-3xl sm:shadow-lg ring-1 ring-[#bcd4e6]/50 hover:ring-[#a1caf1] px-5 py-4 bg-white  border border-gray-100 
shadow-[0_4px_12px_rgba(0,0,0,0.06)] 
hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:scale-101
transition-all duration-300 overflow-hidden"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between py-2">
              <div>
                <h2 className="text-[18px] sm:text-[24px] font-semibold">
                  {job.title}
                </h2>
                <h4 className="text-gray-600 text-[16px] sm:text-[18px] font-medium">
                  {job.companyName}
                </h4>
              </div>
            </div>
            <div className="flex flex-col gap-2 justifu-center whitespace-nowrap text-gray-600  text-[14px] tracking-wide">
              <div className="flex gap-2 items-center">
                <span className="flex text-xs sm:text-sm gap-2 items-center">
                  <PiSuitcaseSimpleLight className="text-gray-600" size={18} />
                  {job.experience}
                </span>
                <span className="flex text-xs sm:text-sm gap-1 items-center">
                  <CiLocationOn size={18} className="text-gray-600" />{" "}
                  {job.location}
                </span>
              </div>
              <span className="flex gap-1 text-xs sm:text-sm items-center">
                <LiaWalletSolid size={18} className="text-gray-600" />{" "}
                {job.salary}
              </span>
              <div className="flex flex-col justify-center gap-2 w-[90%] overflow-hidden">
                <span className="flex gap-1 items-center inter ">
                  <LuBookText size={18} className=" text-gray-600" />{" "}
                  {job.description}
                </span>

                <span className="text-gray-400 text-xs sm:text-sm inter">
                  {job.skills?.join(" ") || "No skills listed"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-500">
                {getRelativeTime(job.createdAt)}
              </span>
              <button
                onClick={handleSave}
                type="button"
                className={`flex items-center gap-1 text-sm tracking-wider transition-transform duration-150 active:scale-125 ${
                  userType === "employer" ? "hidden" : ""
                }`}
              >
                {isSaved ?
                  <div className="flex items-center gap-1 text-blue-500">
                    <MdBookmark
                      size={20}
                      className="mb-1 transition-all duration-200 active:scale-125"
                    />
                    <span className="poppins">Saved</span>
                  </div>
                : <div className="flex items-center gap-1 text-gray-500">
                    <MdBookmarkBorder
                      size={20}
                      className="mb-1 transition-all duration-200 active:scale-125"
                    />
                    <span className="poppins">Save</span>
                  </div>
                }
              </button>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Jobcard;
