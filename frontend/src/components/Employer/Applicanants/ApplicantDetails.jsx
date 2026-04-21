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

const ApplicantDetails = ({ applicant, isOpen, onClose }) => {
  if (!applicant) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-40 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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

        <div className="overflow-y-auto h-[calc(100%-70px)] p-6">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
              {applicant.fname?.[0] || <FiUser />}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {applicant.fname}
            </h1>
            <p className="text-blue-600 font-medium">MERN Stack Developer</p>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 gap-4 mb-8 bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <FiMail className="text-blue-500" />
              <span>{applicant.mail}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <FiMapPin className="text-blue-500" />
              <span>{applicant.location || "Chennai, TN"}</span>
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
              <div>
                <h4 className="font-bold text-sm">Frontend Developer</h4>
                <p className="text-xs text-gray-500">
                  Tech Solutions • 2024 - Present
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Built responsive dashboards using React and Tailwind CSS.
                </p>
              </div>
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
              {["React", "Node.js", "Express", "MongoDB", "Tailwind"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 mt-10">
            <a
              href={applicant.resume}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
            >
              <FiDownload /> Download Resume
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDetails;
