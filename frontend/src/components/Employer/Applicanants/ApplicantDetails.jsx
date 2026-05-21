import React from "react";
import {
  FiX,
  FiMail,
  FiMapPin,
  FiBriefcase,
  FiDownload,
  FiUser,
  FiBookOpen,
  FiLoader,
} from "react-icons/fi";
import { MdSchool } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { updateAppStatus } from "../../../redux/applicants/applicants";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  reviewed: "bg-blue-100 text-blue-700 border-blue-200",
  shortlisted: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};

const ApplicantDetails = ({ isOpen, onClose, selectedApp }) => {
  const dispatch = useDispatch();

  const { updatingStatusId, currentApp } = useSelector(
    (state) => state.applicant,
  );

  const application = selectedApp;
  const user = currentApp;

  const handleStatusChange = async (e) => {
    try {
      await dispatch(
        updateAppStatus({
          appId: application?._id,
          status: e.target.value,
        }),
      ).unwrap();

      console.log("Status updated successfully");
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  if (!application) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xl bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Applicant Profile
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Review applicant details and update status
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-80px)] overflow-y-auto custom-scroll px-6 py-8">
          {/* Hero */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {user?.fname?.[0] || <FiUser />}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              {user?.fname || "Unknown Applicant"}
            </h1>

            <p className="text-blue-600 font-medium mt-1">
              MERN Stack Developer
            </p>

            <div
              className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold border capitalize ${
                statusStyles[application?.status]
              }`}
            >
              {application?.status}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FiMail className="text-blue-500" />

                <a
                  href={`mailto:${user?.mail}`}
                  className="hover:text-blue-600 transition"
                >
                  {user?.mail}
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <IoCallOutline className="text-blue-500" />

                <a
                  href={`tel:${user?.mobile}`}
                  className="hover:text-blue-600 transition"
                >
                  {user?.mobile || "Phone not provided"}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FiMapPin className="text-blue-500" />

                <span>{user?.location || "Location not provided"}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiBriefcase className="text-gray-400" />

              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">
                Profile Summary
              </h3>
            </div>

            <div className="border-l-2 border-blue-100 pl-4">
              <p className="text-sm leading-7 text-gray-600">
                {user?.profileSummary || "No profile summary provided."}
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiBriefcase className="text-gray-400" />

              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">
                Work Experience
              </h3>
            </div>

            <div className="border-l-2 border-blue-100 pl-4 space-y-6">
              {user?.experience?.length > 0 ?
                user?.experience?.map((exp, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-800">{exp?.role}</h4>

                    <p className="text-xs text-gray-500 mt-1">
                      {exp?.company} • {exp?.duration?.join(" - ")}
                    </p>

                    <p className="text-sm text-gray-600 mt-2 leading-6">
                      {exp?.description}
                    </p>
                  </div>
                ))
              : <p className="text-sm text-gray-500">No experience added.</p>}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MdSchool className="text-gray-400" />

              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">
                Education
              </h3>
            </div>

            <div className="border-l-2 border-blue-100 pl-4 space-y-6">
              {user?.educations?.length > 0 ?
                user?.educations?.map((edu, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-800">
                      {edu?.courseName}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">
                      {edu?.collegeName} • {edu?.duration?.join(" - ")}
                    </p>
                  </div>
                ))
              : <p className="text-sm text-gray-500">
                  No education details added.
                </p>
              }
            </div>
          </div>

          {/* Skills */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <FiBookOpen className="text-gray-400" />

              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs">
                Skills
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {user?.skills?.length > 0 ?
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              : <p className="text-sm text-gray-500">No skills added.</p>}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            {/* Resume Button */}
            <a
              href={user?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              <FiDownload />
              Download Resume
            </a>

            {/* Status Select */}
            <div className="relative">
              <select
                value={application?.status || "pending"}
                onChange={handleStatusChange}
                disabled={updatingStatusId === application?._id}
                className={` border rounded-xl px-4 py-3 pr-10 text-sm font-medium outline-none transition ${
                  statusStyles[application?.status]
                } ${
                  updatingStatusId === application?.appId ?
                    "opacity-70 cursor-not-allowed"
                  : ""
                }`}
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>

              {updatingStatusId === application?._id && (
                <FiLoader className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetails;
