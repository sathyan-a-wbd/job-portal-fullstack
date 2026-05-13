import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedJobs } from "../redux/jobs/jobSlice";
import Jobcard from "../components/Jobcard";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs = [] } = useSelector((state) => state.jobs);
  console.log(savedJobs);
  React.useEffect(() => {
    document.title = "Saved Jobs | Jobist.com";
    const fetchSavedJobs = async () => {
      try {
        dispatch(getSavedJobs()).unwrap();
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };
    fetchSavedJobs();
  }, []);
  if (savedJobs.length === 0) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Saved Jobs</h2>
          <p className="text-gray-600 mt-4">You have no saved jobs yet.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Saved Jobs</h2>

        <div>
          {savedJobs?.map((job) => (
            <div
              key={job._id}
              className="bg-white mt-5 p-5 rounded-lg shadow-md"
            >
              <Jobcard jobDetails={job} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavedJobs;
