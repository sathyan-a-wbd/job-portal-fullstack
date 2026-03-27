import React, { useEffect, useState } from "react";

import { GetProfile, UpdateUser } from "../services/api";

const ProfileEdit = () => {
  const params = new URLSearchParams(location.search);
  const userEdit = params.get("userEdit");
  console.log(userEdit);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
  const [dbImage, setDbImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  const handleRemoveImage = () => {
    setPreviewImage(null);
    setImageFile(null);

    setUser({
      ...user,
      profileImage: "",
    });
  };
  const handleDurationChange = (index, value) => {
    if (userEdit === "education") {
      setInputForm((prev) => {
        const updatedDuration = [...prev.duration];
        updatedDuration[index] = value;

        return {
          ...prev,
          duration: updatedDuration,
        };
      });
    } else if (userEdit === "exp") {
      setInputExpForm((prev) => {
        const updatedDuration = [...prev.duration];
        updatedDuration[index] = value;

        return {
          ...prev,
          duration: updatedDuration,
        };
      });
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await GetProfile();
        setUser(user);

        setDbImage(user.profileImage);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let updatedUser = { ...user };

      //  Add education
      if (userEdit === "education") {
        updatedUser.educations = [...(user.educations || []), inputForm];
      }

      //  Add experience
      if (userEdit === "exp") {
        updatedUser.experience = [...(user.experience || []), inputExpForm];
      }

      //  Handle profile image upload
      if (imageFile) {
        if (imageFile && imageFile.size > 2 * 1024 * 1024) {
          alert("Image must be less than 2MB");
          return;
        }
        const reader = new FileReader();

        reader.onloadend = async () => {
          updatedUser.profileImage = reader.result;

          delete updatedUser._id;

          const res = await UpdateUser(updatedUser);

          setUser(res);
          setImageFile(null);
          setPreviewImage(null);

          alert("Updated Successfully");
        };

        reader.readAsDataURL(imageFile);
      } else {
        // normal update (no image)
        delete updatedUser._id;

        const res = await UpdateUser(updatedUser);

        setUser(res);
        alert("Updated Successfully");
      }
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };
  if (loading)
    return (
      <section className="w-full absolute left-0 top-0 h-screen flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  return (
    <section className="w-full px-6 justify-center roboto flex my-5 ">
      {/* basic detailsEdit */}
      <form
        className="w-full rounded-xl shadow-lg p-5 sm:max-w-[600px]"
        onSubmit={handleUpdate}
      >
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
                value={user?.fname}
                onChange={(e) => setUser({ ...user, fname: e.target.value })}
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
        {userEdit === "educationEdit" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add Education Details</h1>

            {/* Course Name */}
            {user?.educations?.map((edu, index) => (
              <div key={index} className="flex flex-col gap-4">
                {/* Course Name */}
                <div className="input-field w-full flex flex-col gap-1">
                  <label className="text-gray-500 poppins text-sm font-medium">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={edu?.courseName || ""}
                    onChange={(e) => {
                      const updated = [...user.educations];
                      updated[index].courseName = e.target.value;

                      setUser({ ...user, educations: updated });
                    }}
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
                    value={edu?.collegeName || ""}
                    onChange={(e) => {
                      const updated = [...user.educations];
                      updated[index].collegeName = e.target.value;

                      setUser({ ...user, educations: updated });
                    }}
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
                      value={edu?.duration?.[0] || ""}
                      onChange={(e) => {
                        const updated = [...user.educations];
                        updated[index].duration = [
                          e.target.value,
                          updated[index].duration?.[1] || "",
                        ];

                        setUser({ ...user, educations: updated });
                      }}
                      className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                    />

                    {/* End */}
                    <input
                      type="date"
                      value={edu?.duration?.[1] || ""}
                      onChange={(e) => {
                        const updated = [...user.educations];
                        updated[index].duration = [
                          updated[index].duration?.[0] || "",
                          e.target.value,
                        ];

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
              <label className="text-gray-500 poppins text-sm font-medium">
                Profile Summary
              </label>

              <textarea
                value={user?.profileSummary || ""}
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
                {/* Role */}
                <div className="input-field w-full flex flex-col gap-1">
                  <label className="text-gray-500 text-sm font-medium">
                    Role
                  </label>
                  <input
                    type="text"
                    value={exp?.role || ""}
                    onChange={(e) => {
                      const updated = [...user.experience];
                      updated[index].role = e.target.value;

                      setUser({ ...user, experience: updated });
                    }}
                    placeholder="Frontend Developer"
                    className="px-3 py-2 border-b border-[#bcd4e6] outline-none"
                  />
                </div>

                {/* Company */}
                <div className="input-field w-full flex flex-col gap-1">
                  <label className="text-gray-500 text-sm font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={exp?.company || ""}
                    onChange={(e) => {
                      const updated = [...user.experience];
                      updated[index].company = e.target.value;

                      setUser({ ...user, experience: updated });
                    }}
                    placeholder="ABC Company"
                    className="px-3 py-2 border-b border-[#bcd4e6] outline-none"
                  />
                </div>

                {/* Description */}
                <div className="input-field w-full flex flex-col gap-2">
                  <label className="text-gray-500 text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    value={exp?.description || ""}
                    onChange={(e) => {
                      const updated = [...user.experience];
                      updated[index].description = e.target.value;

                      setUser({ ...user, experience: updated });
                    }}
                    rows={4}
                    className="px-3 py-2 border border-[#bcd4e6] rounded-md outline-none resize-none"
                  />

                  <div className="text-xs text-gray-400 text-right">
                    {exp?.description?.length || 0}/500
                  </div>
                </div>

                {/* Duration */}
                <div className="input-field w-full flex flex-col gap-3">
                  <label className="text-gray-500 text-sm font-medium">
                    Duration
                  </label>

                  <div className="flex gap-4">
                    {/* Start */}
                    <input
                      type="date"
                      value={exp?.duration?.[0] || ""}
                      onChange={(e) => {
                        const updated = [...user.experience];
                        updated[index].duration = [
                          e.target.value,
                          updated[index].duration?.[1] || "",
                        ];

                        setUser({ ...user, experience: updated });
                      }}
                      className="w-1/2 px-3 py-2 border-b border-[#bcd4e6]"
                    />

                    {/* End */}
                    <input
                      type="date"
                      value={exp?.duration?.[1] || ""}
                      onChange={(e) => {
                        const updated = [...user.experience];
                        updated[index].duration = [
                          updated[index].duration?.[0] || "",
                          e.target.value,
                        ];

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

            <div className="flex flex-col gap-6 items-center gap-4">
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
