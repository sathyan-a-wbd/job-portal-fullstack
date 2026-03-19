import React, { useEffect } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { CiMapPin } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { LuBookText } from "react-icons/lu";
import { MdBookmarkBorder } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { LiaWalletSolid } from "react-icons/lia";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob } from "../features/jobs/jobSlice";

const JobDetails = ({ jobDetails }) => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("job_id");

  const job =
    jobDetails.find((job) => job.id === Number(jobId)) || jobDetails[0];

  const dispatch = useDispatch();
  const selectedJob = useSelector((state) => state.jobs.selectedJob);

  useEffect(() => {
    const handleScrollLock = () => {
      const isMobileOrTab = window.innerWidth < 1024;

      if (selectedJob && isMobileOrTab) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = " ";
      }
    };
    handleScrollLock();
    window.addEventListener("resize", handleScrollLock);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", handleScrollLock);
    };
  }, [selectedJob]);
  return (
    <section
      className={`fixed h-screen overflow-y-auto custom-scroll z-30 md:relative md:z-0 md:px-2 md:py-2 top-0 left-0 `}
    >
      {job && (
        <div className=" bg-[#ffff] flex flex-col gap-5 cursor-pointer  w-full tracking-wide rounded-lg sm:rounded-3xl sm:shadow-lg ring-1 ring-[#bcd4e6]/50 hover:ring-[#a1caf1] px-5 py-4 overflow-hidden">
          <Link className="w-full md:hidden flex items-center justify-end">
            <IoClose
              size={20}
              onClick={() => dispatch(setSelectedJob(false))}
            />
          </Link>
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
                <span className="flex gap-1 items-center">
                  <CiLocationOn size={18} className="text-gray-600" />{" "}
                  {job.location}
                </span>
                <span className="flex gap-1 items-center">
                  <CiMapPin size={18} className="text-gray-600" />{" "}
                  {job.workLocation}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="flex gap-1 items-center">
                  <LiaWalletSolid size={18} className="text-gray-600" />{" "}
                  {job.salary}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-2">
              <button className="px-8 py-2 text-white bg-[#4485fd] rounded-3xl">
                Apply
              </button>
              <span className="flex items-center cursor-pointer gap-1 text-sm text-gray-500 tracking-wider">
                <MdBookmarkBorder size={20} id="save" />{" "}
                <label className="cursor-pointer" htmlFor="save">
                  Save
                </label>
              </span>
              <span className="text-xs text-gray-500">{job.posted}</span>
            </div>
          </div>
          <hr className="border-t border-gray-100" />

          <article className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h3 className="text-[20px] font-semibold text-gray-700">
                Job Description
              </h3>
              <p className=" text-sm items-center inter text-gray-600">
                {job.description}
              </p>
              <h3 className="text-[16px] flex items-center gap-2 font-semibold text-gray-700">
                Experience:{" "}
                <p className=" text-sm items-center inter text-gray-600">
                  {job.experience}
                </p>
              </h3>
            </div>
            <hr className="border-t border-gray-100" />
            <div className="flex flex-col gap-2">
              <h3 className="text-[16px] font-semibold text-gray-700">
                Key Responsibilities:
              </h3>
              {job.responsibilities.map((responsibility, index) => (
                <li
                  key={index}
                  className=" list-none flex px-5 gap-1 text-sm items-center inter text-gray-600"
                >
                  <GoDotFill color={"grey"} size={12} /> {responsibility}
                </li>
              ))}
            </div>
            <div className="flex flex-col">
              <h3 className="text-[14px] flex items-center gap-2 font-semibold text-gray-800">
                Industry Type:
                <p className=" text-sm items-center inter text-gray-600">
                  {job.industryType}
                </p>
              </h3>{" "}
              <h3 className="text-[14px] flex items-center gap-2 font-semibold text-gray-800">
                Department:
                <p className=" text-sm items-center inter text-gray-600">
                  {job.department}
                </p>
              </h3>{" "}
              <h3 className="text-[14px] flex items-center gap-2 font-semibold text-gray-800">
                Employment Type:
                <p className=" text-sm items-center inter text-gray-600">
                  {job.employmentType}
                </p>
              </h3>{" "}
              <h3 className="text-[14px] flex items-center gap-2 font-semibold text-gray-800">
                Role Category:
                <p className=" text-sm items-center inter text-gray-600">
                  {job.roleCategory}
                </p>
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[16px] font-semibold text-gray-700">
                Education:
              </h3>
              <p className=" text-sm items-center inter text-gray-600">
                Bachelor's degree in Computer Science or related field. Relevant
                certifications are a plus.
              </p>
            </div>
            <hr className="border-t border-gray-100" />
            <h3 className="text-[16px] font-semibold text-gray-700">
              Key Skills
            </h3>
            <div>
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block tracking-wider bg-[#4485fd]/20 text-[#4485fd] text-xs font-medium px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
            <hr className="border-t border-gray-100" />
          </article>
        </div>
      )}
    </section>
  );
};

export default JobDetails;
