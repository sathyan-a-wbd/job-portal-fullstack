import React from "react";
import {
  FiX,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiDownload,
  FiUser,
  FiBookOpen,
} from "react-icons/fi";
import { MdSchool } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateAppStatus } from "../../../redux/applicants/applicants";

const ApplicantDetails = ({ isOpen, onClose }) => {
  const currentApp = useSelector((state) => state.applicant.currentApp);
  const dispatch = useDispatch();
  let applicant = currentApp;

  console.log(applicant);
  const handleStatusChange = async (e) => {
    try {
      await dispatch(
        updateAppStatus({ appId: applicant.appId, status: e.target.value }),
      );
      console.log("successFully updated status");
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };
  if (!applicant) return null;
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed  inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-40 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Applicant Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto custom-scroll h-[calc(100%-70px)] p-6">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
              {applicant?.fname?.[0] || <FiUser />}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {applicant?.fname}
            </h1>
            <p className="text-blue-600 font-medium">MERN Stack Developer</p>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 gap-4 mb-8 bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <FiMail className="text-blue-500" />
              <a
                href={`mailto:${applicant?.mail}`}
                className="hover:underline cursor-pointer"
              >
                {applicant?.mail}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <FiMapPin className="text-blue-500" />
              <span>{applicant?.location || "Chennai, TN"}</span>
            </div>
          </div>
          {/* Summary Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiBriefcase className="text-gray-400" />
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">
                Profile summary
              </h3>
            </div>
            <div className="border-l-2 border-blue-100 pl-4 space-y-4">
              <p className="text-sm text-gray-600 mt-1">
                {applicant?.profileSummary || "N/A"}
              </p>
            </div>
          </div>
          {/* Experience Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiBriefcase className="text-gray-400" />
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">
                Work Experience
              </h3>
            </div>
            <div className="border-l-2 border-blue-100 pl-4 space-y-4">
              {applicant?.experience?.map((exp, index) => (
                <div key={index}>
                  <h4 className="font-bold text-sm">{exp?.role}</h4>
                  <p className="text-xs text-gray-500">
                    {exp?.company} {exp?.duration?.join(" - ")}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {exp?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MdSchool className="text-gray-400" />
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">
                Education
              </h3>
            </div>

            <div className="border-l-2 border-blue-100 pl-4 space-y-4">
              {applicant?.educations?.map((edu, i) => (
                <div key={i}>
                  <h4 className="font-bold text-sm">{edu?.courseName}</h4>
                  <p className="text-xs text-gray-500">
                    {edu?.collegeName} - {edu?.duration?.join(" - ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiBookOpen className="text-gray-400" />
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">
                Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {applicant?.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex  gap-4 mt-10">
            <a
              href={applicant?.resume}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
            >
              <FiDownload /> Download Resume
            </a>

            <select
              className="border bg-amber-50 text-amber-600 border-amber-200 rounded-md px-3 py-2 text-sm focus:outline-none"
              value={applicant?.status || "pending"}
              onChange={handleStatusChange}
            >
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetails;
