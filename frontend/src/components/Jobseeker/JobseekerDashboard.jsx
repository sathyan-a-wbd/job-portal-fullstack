import React, { useState } from "react";

import { FiFileText } from "react-icons/fi";
import { IoIosCall } from "react-icons/io";
import { MdCake, MdOutlineAlternateEmail } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import { LuFolderPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { deleteResume, uploadResume } from "../../redux/user/authSlice";
import API from "../../services/newApi";
const JobseekerDashboard = () => {
  const { currentUser: user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [updateMenu, setUpdateMenu] = useState(false);
  const dispatch = useDispatch();
  const showUploadUI = updateMenu || !user?.resume;

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");

    try {
      await dispatch(uploadResume(file)).unwrap();

      setUpdateMenu(false);
      setFile(null);
    } catch (err) {
      toast.error("Failed to upload resume:", err);
    }
  };
  const handleDelete = async () => {
    try {
      await dispatch(deleteResume()).unwrap();
      setUpdateMenu(false);
    } catch (err) {
      toast.error("Failed to delete resume:", err);
    }
  };
  const handleDownload = () => {
    setTimeout(() => {
      const link = document.createElement("a");
      link.target = "_blank";
      link.href = API + user?.resume;
      link.download = "Sathyan-Frontend-Developer.pdf";
      link.click();
    }, 1000);
  };
  return (
    <section className="w-full px-6 justify-center roboto flex my-5 ">
      <div className="flex flex-col w-150 max-w-150  justify-center gap-5">
        {/* name && profileimage */}
        <div className="flex items-center w-full justify-between rounded-xl shadow-lg p-5">
          <h3 className="text-2xl tracking-widest text-gray-700 font-semibold">
            {user?.fname?.toUpperCase()}
          </h3>
          <div className="relative w-15 h-15 min-h-10 min-w-10">
            {/* Image wrapper */}
            <div className="w-full h-full bg-gray-700 rounded-full shadow-lg ring-3 ring-green-600 overflow-hidden flex items-center justify-center">
              {user?.profileImage ?
                <img
                  src={user?.profileImage}
                  alt="profile-img"
                  className="w-full h-full object-cover"
                />
              : <h1 className="text-3xl font-bold text-white">
                  {user?.fname?.toUpperCase().slice(0, 2)}
                </h1>
              }
            </div>

            {/* Edit button */}
            <Link
              to={"/profile-edit/?userEdit=profileImage"}
              className="absolute bottom-0 -right-1 bg-[#4485fd] rounded-full w-6 h-6 flex items-center justify-center shadow-md"
            >
              <FiEdit2 color="white" size={14} />
            </Link>
          </div>
        </div>
        {/* Contact details */}
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Basic details</h2>
            <Link className="" to={"/profile-edit/?userEdit=basicDetails"}>
              <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
            </Link>
          </div>
          <ul className="flex flex-col poppins gap-4">
            {/* details */}
            <li className="flex text-gray-600 items-center gap-2">
              <MdOutlineAlternateEmail size={20} />
              <span className="text-sm poppins">{user?.mail}</span>
            </li>
            <li className="flex text-gray-600 items-center gap-2">
              <IoIosCall size={20} />
              <span className="text-sm poppins">{user?.mobile}</span>
            </li>
            <li className="flex text-gray-600 items-center gap-2">
              <TiLocation size={20} />
              <span className="text-sm poppins">
                {user?.location || "Add your location"}
              </span>
            </li>
            <li className="flex text-gray-600 items-center gap-2">
              <MdCake size={20} className="mb-2" />
              <span className="text-sm poppins">
                {user?.dob || "Add your Date of birth"}
              </span>
            </li>
          </ul>
        </div>
        {/* Career prefrence */}
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Career prefrences</h2>
            <Link to={"/profile-edit/?userEdit=careerPrefer"}>
              <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
            </Link>
          </div>
          <ul className="flex flex-col poppins gap-4">
            {/* details */}
            <li className="flex text-gray-600 flex-col justify-center gap-2">
              <span className="poppins text-xs text-[#bcd4e6] ">
                Preferred job types
              </span>
              <span className="text-sm poppins">
                {user?.jobPrefrence?.join(", ")}
              </span>
            </li>
            <li className="flex text-gray-600 flex-col justify-center gap-2">
              <span className="poppins text-xs text-[#bcd4e6] ">
                Availability to work
              </span>
              <span className="text-sm poppins">{user?.availabilty}</span>
            </li>
            <li className="flex text-gray-600 flex-col justify-center gap-2">
              <span className="poppins text-xs text-[#bcd4e6] ">
                Preferred location
              </span>
              <span className="text-sm poppins">
                {user?.preferredLocation?.join(", ")}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Education</h2>
            <div className="flex items-center gap-4">
              <Link
                to={"/profile-edit/?userEdit=education"}
                className="poppins text-sm text-[#4485fd] cursor-pointer"
              >
                Add
              </Link>
              <Link
                to={"/profile-edit/?userEdit=educationEdit"}
                className="poppins text-sm text-[#4485fd] cursor-pointer"
              >
                Edit
              </Link>
            </div>
          </div>
          <ul className="flex flex-col poppins gap-4">
            {/* details */}
            {user?.educations?.map((education, index) => (
              <li
                key={index}
                className="flex text-gray-600 flex-col justify-center gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">
                    {education?.courseName}
                  </h3>
                </div>
                <span className="text-sm poppins">
                  {education?.collegeName}
                </span>
                <span className="text-sm poppins">
                  {education?.duration.join(" - ")}
                </span>
                <hr className="border-t border-gray-300 my-4" />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Profile summary</h2>
            <Link to={"/profile-edit/?userEdit=summary"}>
              <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
            </Link>
          </div>
          <ul className="flex flex-col poppins gap-4">
            {/* details */}
            <li className="flex text-gray-600 flex-col justify-center gap-2">
              <p className="text-sm poppins justify ">{user?.profileSummary}</p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Key skills</h2>
            <Link to={"/profile-edit/?userEdit=skills"}>
              <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* details */}
            {user?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-[#4485fd]/20 text-[#4485fd] rounded-full border border-gray-300 hover:bg-gray-200 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Languages</h2>
            <div className="flex items-center gap-4" to={"/profile-edit"}>
              <Link
                to={"/profile-edit/?userEdit=languages"}
                className="poppins text-sm text-[#4485fd] cursor-pointer"
              >
                Add
              </Link>
              <Link
                to={"/profile-edit/?userEdit=languagesEdit"}
                className="poppins text-sm text-[#4485fd] cursor-pointer"
              >
                Edit
              </Link>
            </div>
          </div>
          <ul className="flex flex-col poppins gap-4">
            {/* details */}
            {user?.languages?.map((language, index) => (
              <li
                key={index}
                className="flex text-gray-600 flex-col justify-center gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">{language}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Experience</h2>
            <div className="flex items-center gap-4" to={"/profile-edit"}>
              <Link
                to={"/profile-edit/?userEdit=exp"}
                className="poppins text-sm text-[#4485fd] cursor-pointer"
              >
                Add
              </Link>
              <Link
                className="poppins text-sm text-[#4485fd] cursor-pointer"
                to={"/profile-edit/?userEdit=expEdit"}
              >
                Edit
              </Link>
            </div>
          </div>
          <ul className="flex flex-col poppins gap-4">
            {/* details */}
            {user?.experience?.map((exp, index) => (
              <li
                key={index}
                className="flex text-gray-600 flex-col justify-center gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm text-gray-800 font-medium">
                    {exp?.role}
                  </h3>
                </div>
                <span className="text-sm poppins">{exp?.company}</span>

                <p className="text-sm poppins">{exp?.description}</p>
                <span className="text-xs poppins">
                  {exp?.duration.join(" - ")}
                </span>
                <hr className="border-t border-gray-300 my-4" />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Resume</h2>{" "}
          </div>
          <div className="p-4">
            <div className="flex shadow-lg items-center justify-center p-5 border border-white/20 bg-[#badffcb4] rounded-2xl">
              <div className="w-full">
                {
                  showUploadUI ?
                    //  Upload UI
                    <div className="w-full relative h-full py-5 rounded-lg border-dashed border-2 border-gray-400 flex gap-2 flex-col items-center justify-center">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        id="profileUpload"
                        className="hidden"
                        onChange={(e) => {
                          const selectedFile = e.target.files[0];
                          setFile(selectedFile);
                        }}
                      />

                      <label
                        htmlFor="profileUpload"
                        className="w-full h-full text-[#4485fd] flex flex-col gap-2 items-center justify-center poppins cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center rounded-full w-9 h-9 bg-white">
                          <LuFolderPlus size={20} />
                        </div>
                        <div>
                          <span className="text-white" onClick={handleDownload}>
                            {user?.resumeName}
                          </span>
                        </div>
                        {user?.resume ? "Update Resume" : "Upload Resume"}
                      </label>
                    </div>
                    //  Resume display UI
                  : <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-full w-8 h-8 bg-white">
                        <FiFileText size={15} />
                      </div>

                      <div className="flex flex-col">
                        <a
                          href={user?.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm poppins"
                        >
                          {user.resumeName || "Upload your resume"}
                        </a>

                        <span className="text-xs poppins">Uploaded</span>
                      </div>
                    </div>

                }
              </div>
            </div>

            <div className="flex items-center justify-between px-20 py-5">
              <button
                onClick={handleDelete}
                className="border px-6 py-2 cursor-pointer rounded-full text-[#4485fd] hover:bg-gray-200 border-[#4485fd]"
              >
                Delete
              </button>

              {showUploadUI ?
                <button
                  onClick={handleUpload}
                  className="bg-[#4485fd]  cursor-pointer px-6 py-2 rounded-full text-white"
                >
                  Save
                </button>
              : <button
                  onClick={() => setUpdateMenu(true)}
                  className="bg-[#4485fd]  cursor-pointer px-6 py-2 rounded-full text-white"
                >
                  Update
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobseekerDashboard;
