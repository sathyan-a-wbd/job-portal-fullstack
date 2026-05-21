import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaBookmark, FaFileAlt } from "react-icons/fa";

const ActivityDropdown = ({ currentUser }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleProtectedRoute = (path) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-medium text-gray-600 hover:text-[#6ca0dc] transition-all duration-300"
      >
        <span className="poppins">Activity</span>

        <FaChevronDown
          className={`text-xs transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-12 left-0 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 z-50 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {/* Saved Jobs */}
            <button
              onClick={() => handleProtectedRoute("/saved-jobs")}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FaBookmark className="text-blue-600" />
              </div>

              <div>
                <h3 className="font-medium text-gray-800">Saved Jobs</h3>
                <p className="text-xs text-gray-500">
                  View your bookmarked jobs
                </p>
              </div>
            </button>

            {/* Applications */}
            <button
              onClick={() => handleProtectedRoute("/my-applications")}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <FaFileAlt className="text-green-600" />
              </div>

              <div>
                <h3 className="font-medium text-gray-800">My Applications</h3>
                <p className="text-xs text-gray-500">
                  Track application status
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDropdown;
