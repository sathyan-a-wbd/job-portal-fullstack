import React from "react";
import JobDetails from "../../pages/JobDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmpJobEdit from "./EmpJobEdit";
import { useSelector } from "react-redux";

const EmpJobActions = () => {
  const jobs = useSelector((state) => state.jobs.jobs);

  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  return (
    <section className="px-4 py-4 ">
      {type === "view" && <JobDetails />}
      {type === "edit" && <EmpJobEdit />}
    </section>
  );
};

export default EmpJobActions;
