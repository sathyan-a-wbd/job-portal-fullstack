import React, { useEffect, useState } from "react";
import { SiGooglegemini } from "react-icons/si";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { generateSummary, updateUser } from "../redux/user/authSlice";

const ProfileEdit = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(null);

  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryRemains, setSummaryRemains] = useState(5);

  const [inputForm, setInputForm] = useState({
    courseName: "",
    collegeName: "",
    duration: ["", ""],
  });

  const [inputExpForm, setInputExpForm] = useState({
    role: "",
    company: "",
    description: "",
    duration: ["", ""],
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const userEdit = params.get("userEdit");

  useEffect(() => {
    if (currentUser) setFormData(currentUser);
  }, [currentUser]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const createSummary = async () => {
    try {
      setSummaryLoading(true);
      const res = await dispatch(
        generateSummary({
          skills: formData.skills,
          education: JSON.stringify(formData.educations),
          experience: JSON.stringify(formData.experience),
        }),
      ).unwrap();

      setFormData((prev) => ({ ...prev, profileSummary: res.summary }));
      setSummaryRemains(res.remaining);
    } catch (err) {
      console.log(err);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let updatedUser = { ...formData };

    if (userEdit === "education") {
      updatedUser.educations = [...(formData.educations || []), inputForm];
    }

    if (userEdit === "exp") {
      updatedUser.experience = [...(formData.experience || []), inputExpForm];
    }

    const { _id, ...cleanData } = updatedUser;

    try {
      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          cleanData.profileImage = reader.result;
          await dispatch(updateUser(cleanData)).unwrap();
          navigate("/profile-dashboard");
        };
        reader.readAsDataURL(imageFile);
      } else {
        await dispatch(updateUser(cleanData)).unwrap();
        navigate("/profile-dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (index, type) => {
    let updatedUser = { ...formData };

    if (type === "education") {
      updatedUser.educations = formData.educations.filter(
        (_, i) => i !== index,
      );
    }

    if (type === "experience") {
      updatedUser.experience = formData.experience.filter(
        (_, i) => i !== index,
      );
    }

    const { _id, ...cleanData } = updatedUser;
    const res = await dispatch(updateUser(cleanData)).unwrap();
    setFormData(res);
  };

  return (
    <section className="w-full px-6 justify-center roboto flex my-5 ">
      {/* basic detailsEdit */}
      <form
        className="w-full rounded-xl shadow-lg p-5 sm:max-w-150"
        onSubmit={handleUpdate}
      >
        <Link to={"/profile-dashboard"}>
          <FaArrowLeftLong className="my-2  cursor-pointer" size={20} />
        </Link>
        {userEdit === "basicDetails" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl ">Add basic details </h1>
            <div className="input-field w-full flex flex-col gap-1  ">
              <label
                htmlFor="input"
                className=" text-gray-500 poppins text-sm font-medium "
              >
                Full name
              </label>{" "}
              <input
                type="text"
                value={formData.fname || ""}
                onChange={(e) => handleChange("fname", e.target.value)}
                placeholder={"name"}
                className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
              />
            </div>
            <div className="input-field w-full flex flex-col gap-1  ">
              <label
                htmlFor="input"
                className=" text-gray-500 poppins text-sm font-medium "
              >
                Mobile
              </label>{" "}
              <input
                type="text"
                value={user?.mobile}
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                placeholder="mobile"
                className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
              />
            </div>
            <div className="input-field w-full flex flex-col gap-1  ">
              <label
                htmlFor="input"
                className=" text-gray-500 poppins text-sm font-medium "
              >
                Current location
              </label>{" "}
              <input
                type="text"
                value={user?.location}
                onChange={(e) => setUser({ ...user, location: e.target.value })}
                placeholder="Location"
                className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
              />
            </div>
            <div className="input-field w-full flex flex-col gap-1  ">
              <label
                htmlFor="input"
                className=" text-gray-500 poppins text-sm font-medium "
              >
                Date of birth
              </label>{" "}
              <input
                type="date"
                value={user?.dob}
                onChange={(e) => setUser({ ...user, dob: e.target.value })}
                placeholder="Example: 30/11/2004"
                className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
              />
            </div>
          </div>
        )}
        {userEdit === "careerPrefer" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl ">Add your career prefrences</h1>
            <div className="input-field w-full flex flex-col gap-1  ">
              <label
                htmlFor="input"
                className=" text-gray-500 poppins text-sm font-medium "
              >
                Preferred job types
              </label>{" "}
              <span className="text-[10px] text-gray-600">
                Note: use comma "," to add more{" "}
              </span>
              <input
                type="text"
                value={user?.jobPrefrence}
                onChange={(e) =>
                  setUser({ ...user, jobPrefrence: e.target.value.split(",") })
                }
                placeholder={"Job prefrence"}
                className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
              />
            </div>
            <div className="input-field w-full flex flex-col gap-1  ">
              <label
                htmlFor="input"
                className=" text-gray-500 poppins text-sm font-medium "
              >
                Availability to work
              </label>{" "}
              <select
                value={user?.availabilty}
                onChange={(e) =>
                  setUser({ ...user, availabilty: e.target.value })
                }
                className="relative  px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
              >
                <option value="">Select notice period</option>
                <option value="Immediate">Immediate</option>
                <option value="15 Days">15 Days</option>
                <option value="1 Month">1 Month</option>
                <option value="2 Month">2 Month</option>
                <option value="3 Month">3 Month</option>
              </select>
            </div>
            <div className="input-field w-full flex flex-col gap-1  ">
              <label
                htmlFor="input"
                className=" text-gray-500 poppins text-sm font-medium "
              >
                Preferred location
              </label>{" "}
              <span className="text-[10px] text-gray-600">
                Note: use comma "," to add more{" "}
              </span>
              <input
                type="text"
                value={user?.preferredLocation}
                onChange={(e) =>
                  setUser({
                    ...user,
                    preferredLocation: e.target.value.split(","),
                  })
                }
                placeholder="Location"
                className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
              />
            </div>
          </div>
        )}
        {userEdit === "education" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add Education Details</h1>

            {/* Course Name */}
            <div className="input-field w-full flex flex-col gap-1">
              <label className="text-gray-500 poppins text-sm font-medium">
                Course Name
              </label>
              <input
                required
                type="text"
                name="courseName"
                onChange={(e) =>
                  setInputForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                placeholder="B.E / B.Tech / B.Sc"
                className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
              />
            </div>

            {/* College Name */}
            <div className="input-field w-full flex flex-col gap-1">
              <label className="text-gray-500 poppins text-sm font-medium">
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                required
                onChange={(e) =>
                  setInputForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                placeholder="Enter college name"
                className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
              />
            </div>

            {/* Duration */}
            <div className="input-field w-full flex flex-col gap-3">
              <label className="text-gray-500 poppins text-sm font-medium">
                Duration
              </label>

              <div className="flex gap-4">
                {/* Start */}
                <input
                  type="date"
                  name="duration"
                  required
                  onChange={(e) => handleDurationChange(0, e.target.value)}
                  className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                />

                {/* End */}
                <input
                  type="date"
                  name="duration"
                  required
                  onChange={(e) => handleDurationChange(1, e.target.value)}
                  className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                />
              </div>
            </div>
          </div>
        )}
        {userEdit === "educationEdit" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Edit Education Details</h1>

            {user?.educations?.map((edu, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="input-field w-full flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-500 poppins text-sm font-medium">
                      Course Name
                    </label>
                    <MdDelete
                      className="cursor-pointer text-gray-600 hover:text-red-500"
                      size={18}
                      onClick={() => handleDelete(index, "education")}
                    />
                  </div>
                  <input
                    type="text"
                    value={edu?.courseName || ""}
                    onChange={(e) => {
                      const updated = [...user.educations];
                      // Correct: Spread the specific object to unfreeze it
                      updated[index] = {
                        ...updated[index],
                        courseName: e.target.value,
                      };
                      setUser({ ...user, educations: updated });
                    }}
                    placeholder="B.E / B.Tech / B.Sc"
                    className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
                  />
                </div>

                <div className="input-field w-full flex flex-col gap-1">
                  <label className="text-gray-500 poppins text-sm font-medium">
                    College Name
                  </label>
                  <input
                    type="text"
                    value={edu?.collegeName || ""}
                    onChange={(e) => {
                      const updated = [...user.educations];
                      updated[index] = {
                        ...updated[index],
                        collegeName: e.target.value,
                      };
                      setUser({ ...user, educations: updated });
                    }}
                    placeholder="Enter college name"
                    className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
                  />
                </div>

                <div className="input-field w-full flex flex-col gap-3">
                  <label className="text-gray-500 poppins text-sm font-medium">
                    Duration
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="date"
                      value={edu?.duration?.[0] || ""}
                      onChange={(e) => {
                        const updated = [...user.educations];
                        const newDuration = [
                          e.target.value,
                          updated[index].duration?.[1] || "",
                        ];
                        updated[index] = {
                          ...updated[index],
                          duration: newDuration,
                        };
                        setUser({ ...user, educations: updated });
                      }}
                      className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                    />
                    <input
                      type="date"
                      value={edu?.duration?.[1] || ""}
                      onChange={(e) => {
                        const updated = [...user.educations];
                        const newDuration = [
                          updated[index].duration?.[0] || "",
                          e.target.value,
                        ];
                        updated[index] = {
                          ...updated[index],
                          duration: newDuration,
                        };
                        setUser({ ...user, educations: updated });
                      }}
                      className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                    />
                  </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />
              </div>
            ))}
          </div>
        )}
        {userEdit === "summary" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add Profile Summary</h1>

            {/* Profile Summary */}
            <div className="input-field w-full flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-gray-500 poppins text-sm font-medium">
                  Profile Summary
                </label>
                <button
                  onClick={() =>
                    createSummary(
                      user?.skills || "",
                      user?.educations ? JSON.stringify(user?.educations) : "",
                      user?.experience ? JSON.stringify(user?.experience) : "",
                    )
                  }
                  className="poppins text-sm gap-1 text-[#4485fd] cursor-pointer px-4 py-2 ring-1 ring-gray-300 rounded-full"
                  disabled={summaryLoading || summaryRemains <= 0}
                >
                  {summaryLoading ?
                    "Generating..."
                  : <div className="flex gap-1 items-center">
                      {summaryRemains <= 0 ?
                        <>
                          {" "}
                          AI Limit Reached <SiGooglegemini />
                        </>
                      : <>
                          Generate with AI <SiGooglegemini />
                        </>
                      }
                    </div>
                  }
                </button>
              </div>

              <textarea
                value={user?.profileSummary}
                onChange={(e) =>
                  setUser({ ...user, profileSummary: e.target.value })
                }
                placeholder="Write a short summary about yourself, your skills, and experience..."
                rows={5}
                maxLength={500}
                className="relative px-3 py-2 text-gray-800 outline-none border border-[#bcd4e6] rounded-md resize-none"
              />

              {/* Character count */}
              <div className="flex justify-between text-xs text-gray-400">
                <span>Max 500 characters</span>
                <span>{user?.profileSummary?.length || 0}/500</span>
              </div>
            </div>
          </div>
        )}
        {userEdit === "skills" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add Skills</h1>

            {/* Input */}
            <div className="input-field w-full flex flex-col gap-2">
              <label className="text-gray-500 poppins text-sm font-medium">
                Skills
              </label>

              <span className="text-[10px] text-gray-600">
                Note: use comma "," to add multiple skills
              </span>

              <input
                type="text"
                value={user?.skills?.join(", ") || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                placeholder="HTML, CSS, JavaScript, React"
                className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
              />
            </div>

            {/* Preview Chips */}
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#e6f0fa] text-[#2a5d9f] text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {userEdit === "languages" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add Languages</h1>

            {/* Input */}
            <div className="input-field w-full flex flex-col gap-2">
              <label className="text-gray-500 poppins text-sm font-medium">
                Languages
              </label>

              <span className="text-[10px] text-gray-600">
                Note: use comma "," to add multiple languages
              </span>

              <input
                type="text"
                value={user?.languages?.join(", ") || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    languages: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                placeholder="English, Tamil, French"
                className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
              />
            </div>

            {/* Preview Chips */}
            <div className="flex flex-wrap gap-2">
              {user?.languages?.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#e6f0fa] text-[#2a5d9f] text-sm rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
        {userEdit === "languagesEdit" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Edit Languages</h1>

            <div className="input-field w-full flex flex-col gap-2">
              <label className="text-gray-500 poppins text-sm font-medium">
                Languages
              </label>

              {user?.languages?.map((lan, index) => (
                <input
                  type="text"
                  key={index}
                  value={lan}
                  onChange={(e) => {
                    const updatedLanguages = [...user.languages];
                    updatedLanguages[index] = e.target.value;

                    setUser({
                      ...user,
                      languages: updatedLanguages,
                    });
                  }}
                  placeholder="Language"
                  className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
                />
              ))}
            </div>
          </div>
        )}
        {userEdit === "exp" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add Experience Details</h1>

            {/* Experience */}
            <div className="input-field w-full flex flex-col gap-1">
              <label className="text-gray-500 poppins text-sm font-medium">
                Role
              </label>
              <input
                type="text"
                name="role"
                onChange={(e) =>
                  setInputExpForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                placeholder="FrontEnd, Back-End"
                className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
              />
            </div>

            {/* College Name */}
            <div className="input-field w-full flex flex-col gap-1">
              <label className="text-gray-500 poppins text-sm font-medium">
                Company name
              </label>
              <input
                type="text"
                name="companyName"
                onChange={(e) =>
                  setInputExpForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                placeholder="Write a short description about your experience"
                className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
              />
            </div>
            <div className="input-field w-full flex flex-col gap-2">
              <label className="text-gray-500 poppins text-sm font-medium">
                Description
              </label>

              <textarea
                name="description"
                onChange={(e) =>
                  setInputExpForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                placeholder="Write a short summary about yourself, your skills, and experience..."
                rows={5}
                maxLength={500}
                className="relative px-3 py-2 text-gray-800 outline-none border border-[#bcd4e6] rounded-md resize-none"
              />

              {/* Character count */}
              <div className="flex justify-between text-xs text-gray-400">
                <span>Max 500 characters</span>
                <span>{inputExpForm.description.length || 0}/500</span>
              </div>
            </div>
            {/* Duration */}
            <div className="input-field w-full flex flex-col gap-3">
              <label className="text-gray-500 poppins text-sm font-medium">
                Duration
              </label>

              <div className="flex gap-4">
                {/* Start */}
                <input
                  type="date"
                  name="duration"
                  onChange={(e) => handleDurationChange(0, e.target.value)}
                  className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                />

                {/* End */}
                <input
                  type="date"
                  name="duration"
                  onChange={(e) => handleDurationChange(1, e.target.value)}
                  className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                />
              </div>
            </div>
          </div>
        )}
        {userEdit === "expEdit" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Edit Experience Details</h1>

            {user?.experience?.map((exp, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="input-field w-full flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-500 poppins text-sm font-medium">
                      Role
                    </label>
                    <MdDelete
                      className="cursor-pointer text-gray-600 hover:text-red-500"
                      size={18}
                      onClick={() => handleDelete(index, "experience")}
                    />
                  </div>
                  <input
                    type="text"
                    value={exp?.role || ""}
                    onChange={(e) => {
                      const updated = [...user.experience];
                      updated[index] = {
                        ...updated[index],
                        role: e.target.value,
                      };
                      setUser({ ...user, experience: updated });
                    }}
                    placeholder="Frontend Developer"
                    className="px-3 py-2 border-b border-[#bcd4e6] outline-none"
                  />
                </div>

                <div className="input-field w-full flex flex-col gap-1">
                  <label className="text-gray-500 text-sm font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={exp?.company || ""}
                    onChange={(e) => {
                      const updated = [...user.experience];
                      updated[index] = {
                        ...updated[index],
                        company: e.target.value,
                      };
                      setUser({ ...user, experience: updated });
                    }}
                    placeholder="ABC Company"
                    className="px-3 py-2 border-b border-[#bcd4e6] outline-none"
                  />
                </div>

                <div className="input-field w-full flex flex-col gap-2">
                  <label className="text-gray-500 text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    value={exp?.description || ""}
                    onChange={(e) => {
                      const updated = [...user.experience];
                      updated[index] = {
                        ...updated[index],
                        description: e.target.value,
                      };
                      setUser({ ...user, experience: updated });
                    }}
                    rows={4}
                    className="px-3 py-2 border border-[#bcd4e6] rounded-md outline-none resize-none"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {exp?.description?.length || 0}/500
                  </div>
                </div>

                <div className="input-field w-full flex flex-col gap-3">
                  <label className="text-gray-500 text-sm font-medium">
                    Duration
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="date"
                      value={exp?.duration?.[0] || ""}
                      onChange={(e) => {
                        const updated = [...user.experience];
                        const newDuration = [
                          e.target.value,
                          updated[index].duration?.[1] || "",
                        ];
                        updated[index] = {
                          ...updated[index],
                          duration: newDuration,
                        };
                        setUser({ ...user, experience: updated });
                      }}
                      className="w-1/2 px-3 py-2 border-b border-[#bcd4e6]"
                    />
                    <input
                      type="date"
                      value={exp?.duration?.[1] || ""}
                      onChange={(e) => {
                        const updated = [...user.experience];
                        const newDuration = [
                          updated[index].duration?.[0] || "",
                          e.target.value,
                        ];
                        updated[index] = {
                          ...updated[index],
                          duration: newDuration,
                        };
                        setUser({ ...user, experience: updated });
                      }}
                      className="w-1/2 px-3 py-2 border-b border-[#bcd4e6]"
                    />
                  </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />
              </div>
            ))}
          </div>
        )}
        {userEdit === "profileImage" && (
          <div className="flex flex-col gap-6 p-3 poppins">
            <h1 className="text-xl text-center">
              Add Your Recent Profile Picture
            </h1>

            {/* Preview */}

            <div className="flex flex-col gap-6 items-center ">
              <div className="relative w-20 h-20 min-h-10 min-w-10">
                {/* Image wrapper */}
                <div className="w-full h-full bg-gray-700 rounded-full shadow-lg ring-3 ring-green-600 overflow-hidden flex items-center justify-center">
                  {dbImage ?
                    <img
                      src={previewImage || user?.profileImage}
                      alt="profile-img"
                      className="w-full h-full object-cover"
                    />
                  : <h1 className="text-3xl font-bold text-white">
                      {user?.fname?.toUpperCase().slice(0, 2)}
                    </h1>
                  }
                </div>
              </div>
              <h3 className="poppins">Upload profile picture</h3>
              <p className="poppins text-xs text-gray-600">
                Profile with a photo has higher chance of getting noticed by
                recruiters
              </p>
              <div className="flex flex-col gap-2">
                {/* Upload */}
                <input
                  type="file"
                  accept="image/*"
                  id="profileUpload"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {/* Custom button */}
                <label
                  htmlFor="profileUpload"
                  className="px-4 py-2 bg-[#4485fd] text-white rounded-4xl cursor-pointer hover:opacity-90"
                >
                  Choose image
                </label>

                {/* Remove */}
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-[#4485fd] font-medium text-sm"
                >
                  Remove
                </button>
              </div>
              <p className="poppins text-xs text-gray-600">
                Maximum file size: up to 2 MB
              </p>
            </div>
          </div>
        )}

        {userEdit === "profileImage" ?
          <button
            className="bg-[#4485fd] hover-btn tracking-wide w-full py-2 my-2 text-white rounded-4xl cursor-pointer"
            type="submit"
          >
            Upload Image
          </button>
        : <button
            className="bg-[#6ca0dc] hover-btn tracking-wide w-full py-2 my-2 text-white rounded-sm cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        }
      </form>
    </section>
  );
};

export default ProfileEdit;
