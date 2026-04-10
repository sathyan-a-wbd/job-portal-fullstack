import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { LuBookText } from "react-icons/lu";
import { MdBookmarkBorder } from "react-icons/md";

import { LiaWalletSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob } from "../redux/jobs/jobSlice";
import { getRelativeTime } from "../utils/getRelativeTIme";

const TrailJobcard = ({ jobDetails }) => {
  const locationUrl = useLocation();
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const userType = currentUser?.userType;

  const job = jobDetails;
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
          className=" sm:bg-[#ffff]  bg-[#ffffffe5] flex flex-col gap-5 cursor-pointer  w-full tracking-wide rounded-xl sm:rounded-3xl sm:shadow-lg ring-1 ring-[#bcd4e6]/50 hover:ring-[#a1caf1] px-5 py-4 overflow-hidden"
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
              <div className="w-15 h-15 flex items-center overflow-hidden bg-amber-50 justify-center rounded-3xl ring-1 ring-[#bcd4e6]">
                {job.companyLogo ?
                  <img src={job.companyLogo} />
                : <h3 className="text-5xl text-amber-700 ">
                    {job.company?.slice(0, 1) || "?"}
                  </h3>
                }
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
              <span className="flex items-center gap-1 text-sm text-gray-500 tracking-wider">
                <MdBookmarkBorder size={20} /> Save
              </span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default TrailJobcard;
