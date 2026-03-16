import React, { useState } from "react";
import Jobcard from "../components/Jobcard";

const Jobs = () => {
  const [jobDetails, setJobDetails] = useState([
    { companyName: "Sathyan pvt ltd" },
  ]);
  return (
    <section>
      <Jobcard jobDetails={jobDetails} />
    </section>
  );
};

export default Jobs;
