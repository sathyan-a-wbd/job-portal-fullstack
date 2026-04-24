import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getApplicants, getEachApp } from "../redux/applicants/applicants";

import ApplicantView from "../components/Employer/Applicanants/ApplicantView";
import ApplicantDetails from "../components/Employer/Applicanants/ApplicantDetails";
import { useState } from "react";

const Applicants = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  useEffect(() => {
    const fetchApplicants = async () => {
      dispatch(getApplicants(jobId)).unwrap();
    };
    fetchApplicants();
  }, [jobId]);

  const applicants = useSelector((state) => state.applicant.applicants);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenProfile = (app) => {
    const userId = app.applicant?._id;

    if (!userId) {
      console.error("No user ID found for this applicant");
      return;
    }

    setSelectedApp(app.applicant);
    setIsDrawerOpen(true);

    dispatch(getEachApp(userId)).unwrap();
  };

  if (!applicants || applicants.length === 0) {
    return <p className="text-center mt-10">No applicants found</p>;
  }

  return (
    <section className=" w-full p-5 flex gap-2 h-screen">
      {/* Applicants Section */}
      <div className=" w-full  md:p-5 border rounded-lg border-white/20 shadow-md custom-scroll overflow-y-scroll h-full">
        <p className="poppins text-sm my-4 ">
          Total Applications - {applicants.length}
        </p>
        {applicants.map((app) => (
          <ApplicantView
            key={app._id}
            app={app}
            onViewDetails={() => handleOpenProfile(app)}
          />
        ))}
      </div>
      <div>
        <ApplicantDetails
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </section>
  );
};

export default Applicants;
