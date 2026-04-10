import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

import { updateJob } from "../../redux/jobs/jobSlice";
import { FaArrowLeftLong } from "react-icons/fa6";

const EmpJobEdit = () => {
  const { jobs } = useSelector((state) => state.jobs);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const jobId = searchParams.get("job_id");

  const job = jobs.find((j) => j._id.toString() === jobId);
  const [formData, setFormData] = useState({
    title: job?.title || "",
    company: job?.company || "",
    location: job?.location || "",
    workLocation: job?.workLocation || "",
    salary: job?.salary || "",
    description: job?.description || "",
    experience: job?.experience || "",
    industryType: job?.industryType || "",
    department: job?.department || "",
    employmentType: job?.employmentType || "",
    roleCategory: job?.roleCategory || "",
    skills: job?.skills?.join(", ") || "",
    responsibilities: job?.responsibilities?.join(", ") || "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
      responsibilities: formData.responsibilities
        .split(",")
        .map((r) => r.trim()),
    };

    dispatch(updateJob({ id: job._id, data: updatedData }));

    navigate("/");
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="w-[95%] max-w-3xl bg-white rounded-3xl shadow-lg ring-1 ring-[#bcd4e6]/50 px-6 py-6 flex flex-col gap-4"
      >
        <Link to={"/"}>
          <FaArrowLeftLong />
        </Link>
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Edit Job Details
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="label">Job Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            placeholder="Enter job title"
          />
        </div>

        {/* Company */}
        <div className="flex flex-col gap-1">
          <label className="label">Company Name</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="input cursor-not-allowed"
            disabled
            placeholder="Enter company name"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="label">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input"
              placeholder="Enter location"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">Work Type</label>
            <input
              name="workLocation"
              value={formData.workLocation}
              onChange={handleChange}
              className="input"
              placeholder="Remote / Onsite"
            />
          </div>
        </div>

        {/* Salary */}
        <div className="flex flex-col gap-1">
          <label className="label">Salary</label>
          <input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="input"
            placeholder="Enter salary"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="label">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input h-24"
            placeholder="Enter job description"
          />
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-1">
          <label className="label">Experience</label>
          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="input"
            placeholder="e.g. 2-4 years"
          />
        </div>

        {/* Job Meta */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="label">Industry Type</label>
            <input
              name="industryType"
              value={formData.industryType}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">Employment Type</label>
            <input
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">Role Category</label>
            <input
              name="roleCategory"
              value={formData.roleCategory}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-1">
          <label className="label">Skills (comma separated)</label>
          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="input"
            placeholder="React, Node, MongoDB"
          />
        </div>

        {/* Responsibilities */}
        <div className="flex flex-col gap-1">
          <label className="label">Responsibilities (comma separated)</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            className="input h-24"
            placeholder="Build UI, Fix bugs"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-3">
          <button
            type="submit"
            className="flex-1 bg-[#4485fd] text-white py-2 rounded-2xl hover:opacity-90 transition-all"
          >
            Update Job
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-2xl"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Styles */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 10px 12px;
            border-radius: 6px;
            outline: none;
            border: 1px solid #bcd4e6;
            transition: all 0.2s ease;
          }

          .input:focus {
            border-color: #4485fd;
            box-shadow: 0 0 0 2px rgba(68, 133, 253, 0.2);
          }

          .label {
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
          }
        `}
      </style>
    </section>
  );
};

export default EmpJobEdit;
