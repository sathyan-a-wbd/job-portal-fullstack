import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getApplicants, getEachApp } from "../redux/applicants/applicants";

import ApplicantView from "../components/Employer/Applicanants/ApplicantView";
import ApplicantDetails from "../components/Employer/Applicanants/ApplicantDetails";
import ApplicantViewSkeleton from "../components/Loaders/ApplicationViewSkeleton";

const Applicants = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const { applicants, loading } = useSelector((state) => state.applicant);

  const [selectedApp, setSelectedApp] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");

  useEffect(() => {
    dispatch(getApplicants(jobId)).unwrap();
  }, [jobId, dispatch]);

  // OPEN PROFILE
  const handleOpenProfile = (app) => {
    const userId = app.applicant?._id;

    if (!userId) {
      console.error("No user ID found");
      return;
    }

    setSelectedApp(app.applicant);
    setIsDrawerOpen(true);

    dispatch(getEachApp(userId)).unwrap();
  };

  // FILTER LOGIC
  const filteredApplicants = useMemo(() => {
    return applicants?.filter((app) => {
      const applicant = app.applicant;

      // SEARCH
      const matchesSearch =
        applicant?.fname?.toLowerCase().includes(search.toLowerCase()) || false;

      // CITY
      const matchesCity =
        cityFilter === "" ||
        applicant?.location?.toLowerCase().includes(cityFilter.toLowerCase());

      // STATUS
      const matchesStatus = statusFilter === "" || app?.status === statusFilter;

      // EXPERIENCE
      const matchesExperience =
        experienceFilter === "" || applicant?.experience === experienceFilter;

      return matchesSearch && matchesCity && matchesStatus && matchesExperience;
    });
  }, [applicants, search, cityFilter, statusFilter, experienceFilter]);

  // UNIQUE CITIES
  const cities = [
    ...new Set(
      applicants?.map((app) => app?.applicant?.location).filter(Boolean),
    ),
  ];
  useEffect(() => {
    document.title = `Applicants }`;
  }, [applicants]);
  // SHOW EMPTY ONLY AFTER LOADING
  if (!loading && (!applicants || applicants.length === 0)) {
    return (
      <p className="text-center mt-10 text-gray-500">No applicants found</p>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gray-50 px-3 sm:px-5 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {applicants?.job?.title} Applicants
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Review and manage applications for this job posting.
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-5 py-4 min-w-[220px]">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Applications
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-1">
              {filteredApplicants?.length || 0}
            </h2>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Filter Applicants
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Quickly find the right candidates
              </p>
            </div>

            <button
              onClick={() => {
                setSearch("");
                setCityFilter("");
                setStatusFilter("");
                setExperienceFilter("");
              }}
              className="text-sm font-medium border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              Clear Filters
            </button>
          </div>

          {/* FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* SEARCH */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                Search
              </label>

              <input
                type="text"
                placeholder="Search applicant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
              />
            </div>

            {/* CITY */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                City
              </label>

              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
              >
                <option value="">All Cities</option>

                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* STATUS */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                Experience
              </label>

              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
              >
                <option value="">All Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
              </select>
            </div>
          </div>
        </div>

        {/* APPLICANTS LIST */}
        <div className="bg-white border h-[600px] overflow-y-auto custom-scroll border-gray-100 shadow-sm rounded-3xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Applicant List
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Showing {filteredApplicants?.length || 0} applicants
              </p>
            </div>
          </div>

          {/* LIST */}
          <div className="space-y-4">
            {loading ?
              Array.from({ length: 4 }).map((_, index) => (
                <ApplicantViewSkeleton key={index} />
              ))
            : filteredApplicants?.length > 0 ?
              filteredApplicants.map((app) => (
                <ApplicantView
                  key={app._id}
                  app={app}
                  onViewDetails={() => handleOpenProfile(app)}
                />
              ))
            : <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  📭
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  No Applicants Found
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  No applicants match the selected filters.
                </p>
              </div>
            }
          </div>
        </div>

        {/* DETAILS DRAWER */}
        <ApplicantDetails
          selectedApp={selectedApp}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </section>
  );
};

export default Applicants;
