import React from "react";
import { Link } from "react-router-dom";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { LuBookText } from "react-icons/lu";
import { MdBookmarkBorder } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
const Jobcard = ({ jobDetails }) => {
  const text = "Sathyan";
  return (
    <div className=" bg-[#ffff] cursor-pointer w-140 max-w-140 tracking-wide rounded-2xl shadow-lg ring-1 ring-[#bcd4e6]/50 px-5 py-4 overflow-hidden">
      {jobDetails.map((job) => (
        <div className="flex flex-col gap-1 ">
          <div className="flex items-center justify-between py-2">
            <div>
              <h2 className="text-[24px] font-semibold">Job Title</h2>
              <h4 className="text-gray-600 font-medium">Company name</h4>
            </div>
            <div className="w-15 h-15 flex items-center bg-amber-50 justify-center rounded-3xl ring-1 ring-[#bcd4e6]">
              {job.companyImg ?
                <img src={job.companyImg} alt="company logo" />
              : <h3 className="text-5xl text-amber-700 ">{text.slice(0, 1)}</h3>
              }
            </div>
          </div>
          <div className="flex flex-col gap-2 justifu-center whitespace-nowrap text-gray-600  text-[14px] tracking-wide">
            <div className="flex gap-2 items-center">
              <span className="flex gap-2 items-center">
                <PiSuitcaseSimpleLight className="text-gray-600" size={18} />{" "}
                0-1
              </span>
              <span className="flex gap-1 items-center">
                <CiLocationOn size={18} className="text-gray-600" /> Chennai
              </span>
            </div>
            <div className="flex flex-col justify-center gap-2 w-[90%] overflow-hidden">
              <span className="flex gap-1 items-center inter ">
                <LuBookText size={18} className=" text-gray-600" /> Description
                Skilled in html css jsvascript Lorem ipsum dolor, sit amet Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Architecto
                assumenda minus natus! Ea doloribus tempora omnis quae assumenda
                reiciendis officia libero corrupti qui quas, recusandae odit
                similique nihil, nemo cum?
              </span>
              <span className="text-gray-400 text-[13px] inter">
                Html css javascript python java Mern blah blah
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">2 days</span>
            <span className="flex items-center gap-1 text-sm text-gray-500 tracking-wider">
              <MdBookmarkBorder size={20} /> Save
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jobcard;
