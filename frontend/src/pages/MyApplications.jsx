import React, { useEffect, useMemo, useState } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaCalendarAlt,
  FaFilter,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getJobSeekerApplications } from "../redux/applicants/applicants";
import { Link } from "react-router-dom";
const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  shortlisted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const filterOptions = ["all", "pending", "reviewed", "shortlisted", "rejected"];

const MyApplications = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    document.title = "My Applications - Jobist.com";

    const fetchMyApplications = async () => {
      try {
        await dispatch(getJobSeekerApplications(currentUser._id)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser?._id) {
      fetchMyApplications();
    }
  }, [currentUser, dispatch]);

  const applications = useSelector((state) => state.applicant.applicants);

  // Filtered Applications
  const filteredApplications = useMemo(() => {
    if (selectedStatus === "all") {
      return applications;
    }

    return applications.filter(
      (application) => application?.status === selectedStatus,
    );
  }, [applications, selectedStatus]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Applications
            </h1>

            <p className="text-gray-500 mt-2">
              Track all the jobs you have applied for
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <FaFilter className="text-gray-500" />

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent outline-none text-sm font-medium text-gray-700 cursor-pointer"
            >
              {filterOptions.map((status) => (
                <option key={status} value={status} className="capitalize">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 ?
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Applications Found
            </h2>

            <p className="text-gray-500 mt-2">
              No applications available for the selected status.
            </p>
          </div>
        : <div className="grid gap-6">
            {filteredApplications.map((application) => (
              <Link
                to={`/job-details?job_id=${application?.job?._id}`}
                key={application?._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  {/* Left Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                        <FaBriefcase className="text-blue-600 text-xl" />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {application?.job?.title}
                        </h2>

                        <p className="text-gray-500 text-sm">
                          {application?.job?.companyName}
                        </p>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400" />

                        <span>{application?.job?.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-gray-400" />

                        <span>{application?.job?.salary}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />

                        <span>
                          Applied on{" "}
                          {new Date(
                            application?.appliedAt,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                        statusColors[application?.status]
                      }`}
                    >
                      {application?.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default MyApplications;
