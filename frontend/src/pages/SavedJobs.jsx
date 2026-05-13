import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedJobs } from "../redux/jobs/jobSlice";
import Jobcard from "../components/Jobcard";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs = [] } = useSelector((state) => state.jobs);

  React.useEffect(() => {
    document.title = "Saved Jobs | Jobist.com";

    const fetchSavedJobs = async () => {
      try {
        await dispatch(getSavedJobs()).unwrap();
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    fetchSavedJobs();
  }, [dispatch]);

  if (savedJobs.length === 0) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">Saved Jobs</h2>

          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            You have no saved jobs yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8 w-full flex justify-between items-center rounded-xl bg-white shadow-md p-5">
          <h2 className="text-2xl sm:text-2xl lg:text-4xl font-medium roboto text-gray-700">
            Saved Jobs
          </h2>
          <span className="text-sm text-gray-500 poppins">
            {savedJobs.length} {savedJobs.length === 1 ? "job" : "jobs"} saved
          </span>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {savedJobs?.map((savedJob) => (
            <div key={savedJob._id}>
              <Jobcard jobDetails={savedJob.job} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavedJobs;
