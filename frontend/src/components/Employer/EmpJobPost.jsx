import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createJob, getMyJobs } from "../../redux/jobs/jobSlice";
import toast from "react-hot-toast";

const EmpJobPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    workLocation: "",
    salary: "",
    description: "",
    experience: "",
    industryType: "",
    department: "",
    employmentType: "",
    roleCategory: "",
    skills: "",
    applyLink: "",
    responsibilities: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
      responsibilities: formData.responsibilities
        .split(",")
        .map((r) => r.trim()),
    };
    const res = await dispatch(createJob(payload));

    if (createJob.fulfilled.match(res)) {
      await dispatch(getMyJobs()).unwrap();
      toast.success("Job Created Successfully");
      navigate("/");
    } else {
      toast.error(res.payload?.message || "Failed to create job");
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-3 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-md ring-1 ring-[#bcd4e6]/50 px-4 sm:px-6 py-6 flex flex-col gap-4"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 text-center">
          Post a Job
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="label">Job Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            placeholder="Frontend Developer"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="label">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input"
              placeholder="Chennai"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label">Work Type</label>
            <select
              name="workLocation"
              value={formData.workLocation}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
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
            placeholder="₹3-5 LPA / Not disclosed"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="label">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input h-28"
            placeholder="Describe the role..."
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
            placeholder="0-2 years"
          />
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="industryType"
            value={formData.industryType}
            onChange={handleChange}
            className="input"
            placeholder="Industry Type"
          />
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="input"
            placeholder="Department"
          />
          <input
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="input"
            placeholder="Employment Type"
          />
          <input
            name="roleCategory"
            value={formData.roleCategory}
            onChange={handleChange}
            className="input"
            placeholder="Role Category"
          />
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
          <label className="label">Responsibilities</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            className="input h-28"
            placeholder="Build UI, Develop APIs"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="label">
            Apply Link <span>(Optional)</span>
          </label>
          <input
            name="applyLink"
            value={formData.applyLink}
            onChange={handleChange}
            className="input"
            placeholder="Leave empty to use default jobist apply feature
            "
          />
        </div>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <button
            type="submit"
            className="flex-1 bg-[#4485fd] text-white py-2 rounded-xl hover:opacity-90 transition"
          >
            Post Job
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl"
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
            border-radius: 8px;
            border: 1px solid #bcd4e6;
            outline: none;
            font-size: 14px;
          }

          .input:focus {
            border-color: #4485fd;
            box-shadow: 0 0 0 2px rgba(68, 133, 253, 0.2);
          }

          .label {
            font-size: 13px;
            color: #6b7280;
            font-weight: 500;
          }
        `}
      </style>
    </section>
  );
};

export default EmpJobPost;
