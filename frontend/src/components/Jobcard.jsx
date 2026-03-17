import React from "react";
import { Link } from "react-router-dom";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { LuBookText } from "react-icons/lu";
import { MdBookmarkBorder } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { LiaWalletSolid } from "react-icons/lia";
const Jobcard = ({ jobDetails }) => {
  return (
    <div className="flex flex-col justify-center gap-5">
      {jobDetails.map((job) => (
        <Link
          to={`/jobs-list/${job.id}`}
          replace
          state={{ fromList: true }}
          key={job.id}
          className=" bg-[#ffff] flex flex-col gap-5 cursor-pointer  w-full tracking-wide rounded-3xl shadow-lg ring-1 ring-[#bcd4e6]/50 hover:ring-[#a1caf1] px-5 py-4 overflow-hidden"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between py-2">
              <div>
                <h2 className="text-[24px] font-semibold">{job.title}</h2>
                <h4 className="text-gray-600 font-medium">{job.company}</h4>
              </div>
              <div className="w-15 h-15 flex items-center overflow-hidden bg-amber-50 justify-center rounded-3xl ring-1 ring-[#bcd4e6]">
                {job.companyImg ?
                  <img src={job.companyImg} />
                : <h3 className="text-5xl text-amber-700 ">
                    {job.company.slice(0, 1)}
                  </h3>
                }
              </div>
            </div>
            <div className="flex flex-col gap-2 justifu-center whitespace-nowrap text-gray-600  text-[14px] tracking-wide">
              <div className="flex gap-2 items-center">
                <span className="flex gap-2 items-center">
                  <PiSuitcaseSimpleLight className="text-gray-600" size={18} />
                  {job.experience}
                </span>
                <span className="flex gap-1 items-center">
                  <CiLocationOn size={18} className="text-gray-600" />{" "}
                  {job.location}
                </span>
              </div>
              <span className="flex gap-1 items-center">
                <LiaWalletSolid size={18} className="text-gray-600" />{" "}
                {job.salary}
              </span>
              <div className="flex flex-col justify-center gap-2 w-[90%] overflow-hidden">
                <span className="flex gap-1 items-center inter ">
                  <LuBookText size={18} className=" text-gray-600" />{" "}
                  {job.description}
                </span>

                <span className="text-gray-400 text-[13px] inter">
                  {job.skills.join(" ")}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{job.posted}</span>
              <span className="flex items-center gap-1 text-sm text-gray-500 tracking-wider">
                <MdBookmarkBorder size={20} /> Save
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Jobcard;
