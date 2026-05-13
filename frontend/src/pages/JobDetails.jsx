import React, { useEffect } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { CiMapPin } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { LuBookText } from "react-icons/lu";
import { MdBookmark, MdBookmarkBorder, MdArrowOutward } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { LiaWalletSolid } from "react-icons/lia";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  resetApplyStatus,
  setSelectedJob,
  applyToJob,
  unsaveJob,
  saveJob,
} from "../redux/jobs/jobSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getRelativeTime } from "../utils/getRelativeTIme";
import toast from "react-hot-toast";

const JobDetails = ({ defaultJob }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { jobs = [] } = useSelector((state) => state.jobs);
  const [searchParams] = useSearchParams();
  const userType = currentUser?.userType;
  const jobId = searchParams.get("job_id");
  const dispatch = useDispatch();
  const job =
    Array.isArray(jobs) ?
      jobs.find((j) => j._id.toString() === jobId) || defaultJob
    : [];
  const { selectedJob, applyStatus, applyError } = useSelector(
    (state) => state.jobs,
  );

  const navigate = useNavigate();
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
  useEffect(() => {
    if (applyStatus === "applied") {
      toast.success("Application submitted successfully!");
    }
    if (applyStatus === "error" && applyError) {
      toast.error(applyError);
    }
  }, [applyStatus, applyError]);
  useEffect(() => {
    dispatch(resetApplyStatus());
  }, [job?._id]);
  const handleApply = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    dispatch(applyToJob({ jobId: job._id }));
  };
  const { savedJobs = [] } = useSelector((state) => state.jobs);
  const isSaved = savedJobs.some((saved) => saved?.job?._id === job._id);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isSaved) {
        await dispatch(unsaveJob(job._id)).unwrap();
      } else {
        await dispatch(saveJob(job._id)).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section
      className={`fixed w-full  h-screen overflow-y-auto custom-scroll z-30 md:relative md:z-0 md:p-2 top-0 left-0 `}
    >
      {job && (
        <div className=" bg-[#ffff] flex flex-col gap-5 cursor-pointer  w-full tracking-wide rounded-lg sm:rounded-3xl sm:shadow-lg ring-1 ring-[#bcd4e6]/50 hover:ring-[#a1caf1] px-5 py-4 overflow-hidden">
          <Link
            to={"/"}
            className="w-full md:hidden flex items-center justify-end"
          >
            <IoClose
              size={20}
              onClick={() => dispatch(setSelectedJob(false))}
            />
          </Link>
          {userType === "employer" && (
            <Link to={"/"}>
              <FaArrowLeftLong />
            </Link>
          )}

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between py-2">
              <div>
                <h2 className="text-[24px] font-semibold">{job.title}</h2>
                <h4 className="text-gray-600 font-medium">{job.companyName}</h4>
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
              {job?.applyLink ?
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={` ${currentUser?.userType === "employer" ? "hidden" : "flex"} flex gap-2 items-center px-8 py-2 text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl`}
                >
                  Apply <MdArrowOutward />
                </a>
              : <button
                  onClick={handleApply}
                  disabled={
                    applyStatus === "loading" || applyStatus === "applied"
                  }
                  className={`${currentUser?.userType === "employer" ? "hidden" : "flex"} flex gap-2 items-center px-8 py-2 text-white rounded-3xl transition-all
          ${
            applyStatus === "applied" ? "bg-green-500 cursor-not-allowed"
            : applyStatus === "loading" ? "bg-blue-300 cursor-wait"
            : "bg-linear-to-r from-indigo-500 via-[#6c00ff] to-[#8c00ff] cursor-pointer hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] transition duration-300 ease-in-out"
          }`}
                >
                  {applyStatus === "loading" && "Applying..."}
                  {applyStatus === "applied" && "✓ Applied"}
                  {applyStatus === "error" && "Retry"}
                  {applyStatus === "idle" && "Apply"}
                </button>
              }
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
              <span className="flex gap-1 text-xs items-center">
                {getRelativeTime(job.createdAt)}
              </span>
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
              {job?.responsibilities?.map((responsibility, index) => (
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
              {job?.skills?.map((skill, index) => (
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
