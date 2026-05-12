import React from "react";
import {
  FiMail,
  FiMapPin,
  FiCalendar,
  FiExternalLink,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";

const ApplicantView = ({ app, onViewDetails }) => {
  const user = app?.applicant;

  if (!user) return null;

  return (
    <div className="group relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-100">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md">
            <FiUser size={22} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg leading-tight">
              {user?.fname || "Anonymous Applicant"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">
              Applied {new Date(app.appliedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border 
          ${
            app.status === "pending" ?
              "bg-amber-50 text-amber-600 border-amber-200"
            : app.status === "shortlisted" ?
              "bg-emerald-50 text-emerald-600 border-emerald-200"
            : "bg-rose-50 text-rose-600 border-rose-200"
          }`}
        >
          {app.status}
        </span>
      </div>

      {/* Info Section */}
      <div className="space-y-1 py-2 border-y border-gray-50 my-2">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-blue-500 shrink-0">
            <FiMail size={16} />
          </div>
          <span className="truncate font-medium">
            {user?.mail || "No email"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-blue-500 shrink-0">
            <FiMapPin size={16} />
          </div>
          <span className="font-medium">
            {user?.location || "Not Specified"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-blue-500 shrink-0">
            <FiBriefcase size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-tight leading-none mb-0.5">
              Experience
            </span>
            <span className="font-semibold text-gray-800 leading-none">
              {user.experience || "Fresher"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={onViewDetails}
          className="flex-[2] inline-flex justify-center items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95"
        >
          View Details
        </button>

        {user?.resume && (
          <a
            href={user.resume}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-gray-600 text-sm font-semibold rounded-xl transition-all"
          >
            <FiExternalLink />
            Resume
          </a>
        )}
      </div>
    </div>
  );
};

export default ApplicantView;
