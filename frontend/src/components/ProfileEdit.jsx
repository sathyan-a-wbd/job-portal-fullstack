import React, { useState, useEffect } from "react";
import { SiGooglegemini } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import {
  generateSummary,
  updateUser,
  getProfile,
} from "../redux/user/authSlice";

const ProfileEdit = () => {
  const params = new URLSearchParams(location.search);
  const userEdit = params.get("userEdit");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading, reduxError } = useSelector(
    (state) => state.auth,
  );

  const userType = currentUser?.userType;

  const [draft, setDraft] = useState(null);
  const [summaryRemains, setSummaryRemains] = useState(5);

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [inputForm, setInputForm] = useState({
    courseName: "",
    collegeName: "",
    duration: ["", ""],
  });
  const [inputExpForm, setInputExpForm] = useState({
    role: "",
    companyName: "",
    description: "",
    duration: ["", ""],
  });

  useEffect(() => {
    if (currentUser) {
      setDraft({ ...currentUser });
    }
  }, [currentUser]);

  const handleDurationChange = (index, value) => {
    if (userEdit === "education") {
      setInputForm((prev) => {
        const updated = [...prev.duration];
        updated[index] = value;
        return { ...prev, duration: updated };
      });
    } else if (userEdit === "exp") {
      setInputExpForm((prev) => {
        const updated = [...prev.duration];
        updated[index] = value;
        return { ...prev, duration: updated };
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setImageFile(null);
    setDraft((prev) => ({ ...prev, profileImage: "" }));
  };

  const handleGenerateSummary = async () => {
    try {
      const res = await dispatch(
        generateSummary({
          skills: draft?.skills || "",
          education: draft?.educations ? JSON.stringify(draft.educations) : "",
          experience: draft?.experience ? JSON.stringify(draft.experience) : "",
        }),
      ).unwrap();

      setDraft((prev) => ({ ...prev, profileSummary: res.summary }));
      setSummaryRemains(res.remaining);
    } catch (err) {
      toast.error("Summary generation failed:", err);
    }
  };

  const handleDelete = async (index, type) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${type} record?`,
    );
    if (!confirmed) return;

    try {
      let updatedDraft = { ...draft };

      if (type === "education") {
        updatedDraft.educations = draft.educations.filter(
          (_, i) => i !== index,
        );
      } else if (type === "experience") {
        updatedDraft.experience = draft.experience.filter(
          (_, i) => i !== index,
        );
      } else if (type === "languages") {
        updatedDraft.languages = draft.languages.filter((_, i) => i !== index);
      }

      const { _id, ...cleanData } = updatedDraft;

      await dispatch(updateUser(cleanData)).unwrap();
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Delete failed", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let updatedDraft = { ...draft };

      if (userEdit === "education") {
        updatedDraft.educations = [...(draft.educations || []), inputForm];
      }

      if (userEdit === "exp") {
        updatedDraft.experience = [...(draft.experience || []), inputExpForm];
      }

      const saveAndNavigate = async (dataToSave) => {
        const { _id, ...cleanData } = dataToSave;

        await dispatch(updateUser(cleanData)).unwrap();
        await dispatch(getProfile()).unwrap();
        setImageFile(null);
        setPreviewImage(null);
        toast.success("Profile Updated Successfully!");
        navigate("/profile-dashboard");
      };

      if (imageFile) {
        if (imageFile.size > 2 * 1024 * 1024) {
          toast.error("Image size should be less than 2MB");
          return;
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
          updatedDraft.profileImage = reader.result;
          await saveAndNavigate(updatedDraft);
        };
        reader.readAsDataURL(imageFile);
      } else {
        await saveAndNavigate(updatedDraft);
      }
    } catch (err) {
      toast.error(
        reduxError?.message || "Something went wrong while updating.",
      );
    }
  };

  if (!draft) return null;

  return (
    <section className="w-full px-6 justify-center roboto flex my-5">
      <form
        className="w-full rounded-xl shadow-lg p-5 sm:max-w-150"
        onSubmit={handleUpdate}
      >
        <Link to="/profile-dashboard">
          <FaArrowLeftLong className="my-2 cursor-pointer" size={20} />
        </Link>

        {/* ── Basic Details ─────────────────────────────────────── */}
        {userEdit === "basicDetails" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add basic details</h1>

            {userType === "jobseeker" &&
              [
                {
                  label: "Full name",
                  key: "fname",
                  type: "text",
                  placeholder: "name",
                },
                {
                  label: "Mobile",
                  key: "mobile",
                  type: "text",
                  placeholder: "mobile",
                },
                {
                  label: "Current location",
                  key: "location",
                  type: "text",
                  placeholder: "Location",
                },
                {
                  label: "Date of birth",
                  key: "dob",
                  type: "date",
                  placeholder: "",
                },
              ].map(({ label, key, type, placeholder }) => (
                <div
                  key={key}
                  className="input-field w-full flex flex-col gap-1"
                >
                  <label className="text-gray-500 poppins text-sm font-medium">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={draft[key] ?? ""}
                    onChange={(e) =>
                      setDraft({ ...draft, [key]: e.target.value })
                    }
                    placeholder={placeholder}
                    className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
                  />
                </div>
              ))}
            {userType === "employer" &&
              [
                {
                  label: "Full name",
                  key: "fname",
                  type: "text",
                  placeholder: "name",
                },
                {
                  label: "Mobile",
                  key: "mobile",
                  type: "text",
                  placeholder: "mobile",
                },
              ].map(({ label, key, type, placeholder }) => (
                <div
                  key={key}
                  className="input-field w-full flex flex-col gap-1"
                >
                  <label className="text-gray-500 poppins text-sm font-medium">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={draft[key] ?? ""}
                    onChange={(e) =>
                      setDraft({ ...draft, [key]: e.target.value })
                    }
                    placeholder={placeholder}
                    className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
                  />
                </div>
              ))}
          </div>
        )}

        {userEdit === "companyDetails" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Edit company details</h1>
            {[
              {
                label: "Company name",
                key: "companyName",
                type: "text",
                placeholder: "Company name",
              },
              {
                label: "Company mail",
                key: "companyEmail",
                type: "text",
                placeholder: "Company Email",
              },
              {
                label: "Company location",
                key: "companyLocation",
                type: "text",
                placeholder: "Company location",
              },
              {
                label: "Company website link",
                key: "website",
                type: "text",
                placeholder: "Company website",
              },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} className="input-field w-full flex flex-col gap-1">
                <label className="text-gray-500 poppins text-sm font-medium">
                  {label}
                </label>
                <input
                  type={type}
                  value={draft[key] ?? ""}
                  onChange={(e) =>
                    setDraft({ ...draft, [key]: e.target.value })
                  }
                  placeholder={placeholder}
                  className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
                />
              </div>
            ))}
          </div>
        )}
        {userEdit === "companyDescription" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add your company description </h1>
            <textarea
              value={draft?.description || ""}
              onChange={(e) =>
                setDraft({ ...draft, description: e.target.value })
              }
              placeholder="Write a short description about your company"
              rows={5}
              maxLength={500}
              className="relative px-3 py-2 text-gray-800 outline-none border border-[#bcd4e6] rounded-md resize-none"
            />
          </div>
        )}
        {userEdit === "careerPrefer" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add your career preferences</h1>

            <div className="input-field w-full flex flex-col gap-1">
              <label className="text-gray-500 poppins text-sm font-medium">
                Preferred job types
              </label>
              <span className="text-[10px] text-gray-600">
                Note: use comma "," to add more
              </span>
              <input
                type="text"
                value={draft?.jobPrefrence || ""}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    jobPrefrence: e.target.value.split(","),
                  })
                }
                placeholder="Job preference"
                className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
              />
            </div>

            <div className="input-field w-full flex flex-col gap-1">
              <label className="text-gray-500 poppins text-sm font-medium">
                Availability to work
              </label>
              <select
                value={draft?.availabilty || ""}
                onChange={(e) =>
                  setDraft({ ...draft, availabilty: e.target.value })
                }
                className="relative px-3 py-2 text-gray-800 outline-none poppins border-b border-b-[#bcd4e6] rounded-sm"
              >
                <option value="">Select notice period</option>
                {["Immediate", "15 Days", "1 Month", "2 Month", "3 Month"].map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="input-field w-full flex flex-col gap-1">
              <label className="text-gray-500 poppins text-sm font-medium">
                Preferred location
              </label>
              <span className="text-[10px] text-gray-600">
                Note: use comma "," to add more
              </span>
              <input
                type="text"
                value={draft?.preferredLocation || ""}
                onChange={(e) =>
                  setDraft({
                    ...draft,
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

            <div className="input-field w-full flex flex-col gap-1">
              <label className="text-gray-500 poppins text-sm font-medium">
                College Name
              </label>
              <input
                required
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

            <div className="input-field w-full flex flex-col gap-3">
              <label className="text-gray-500 poppins text-sm font-medium">
                Duration
              </label>
              <div className="flex gap-4">
                <input
                  required
                  type="date"
                  onChange={(e) => handleDurationChange(0, e.target.value)}
                  className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                />
                <input
                  required
                  type="date"
                  onChange={(e) => handleDurationChange(1, e.target.value)}
                  className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Edit Education ────────────────────────────────────── */}
        {userEdit === "educationEdit" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Edit Education Details</h1>

            {draft?.educations?.map((edu, index) => (
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
                      const updated = draft.educations.map((item, i) =>
                        i === index ?
                          { ...item, courseName: e.target.value }
                        : item,
                      );
                      setDraft({ ...draft, educations: updated });
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
                      const updated = draft.educations.map((item, i) =>
                        i === index ?
                          { ...item, collegeName: e.target.value }
                        : item,
                      );
                      setDraft({ ...draft, educations: updated });
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
                    {[0, 1].map((i) => (
                      <input
                        key={i}
                        type="date"
                        value={edu?.duration?.[i] || ""}
                        onChange={(e) => {
                          const updated = draft.educations.map((item, idx) => {
                            if (idx !== index) return item;
                            const newDuration = [
                              ...(item.duration || ["", ""]),
                            ];
                            newDuration[i] = e.target.value;
                            return { ...item, duration: newDuration };
                          });
                          setDraft({ ...draft, educations: updated });
                        }}
                        className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                      />
                    ))}
                  </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />
              </div>
            ))}
          </div>
        )}

        {/* ── Profile Summary ───────────────────────────────────── */}
        {userEdit === "summary" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add Profile Summary</h1>

            <div className="input-field w-full flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-gray-500 poppins text-sm font-medium">
                  Profile Summary
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  disabled={isLoading || summaryRemains <= 0}
                  className="poppins text-sm gap-1 text-[#4485fd] cursor-pointer px-4 py-2 ring-1 ring-gray-300 rounded-full disabled:opacity-50"
                >
                  {isLoading ?
                    "Generating..."
                  : <div className="flex gap-1 items-center">
                      {summaryRemains <= 0 ?
                        <>
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
                value={draft?.profileSummary || ""}
                onChange={(e) =>
                  setDraft({ ...draft, profileSummary: e.target.value })
                }
                placeholder="Write a short summary about yourself, your skills, and experience..."
                rows={5}
                maxLength={500}
                className="relative px-3 py-2 text-gray-800 outline-none border border-[#bcd4e6] rounded-md resize-none"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Max 500 characters</span>
                <span>{draft?.profileSummary?.length || 0}/500</span>
              </div>
            </div>
          </div>
        )}

        {userEdit === "skills" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add Skills</h1>

            <div className="input-field w-full flex flex-col gap-2">
              <label className="text-gray-500 poppins text-sm font-medium">
                Skills
              </label>
              <span className="text-[10px] text-gray-600">
                Note: use comma "," to add multiple skills
              </span>
              <input
                type="text"
                value={draft?.skills?.join(", ") || ""}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                placeholder="HTML, CSS, JavaScript, React"
                className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {draft?.skills?.map((skill, index) => (
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

            <div className="input-field w-full flex flex-col gap-2">
              <label className="text-gray-500 poppins text-sm font-medium">
                Languages
              </label>
              <span className="text-[10px] text-gray-600">
                Note: use comma "," to add multiple languages
              </span>
              <input
                type="text"
                value={draft?.languages?.join(", ") || ""}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    languages: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                placeholder="English, Tamil, French"
                className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {draft?.languages?.map((lang, index) => (
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

        {/* ── Edit Languages ────────────────────────────────────── */}
        {userEdit === "languagesEdit" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Edit Languages</h1>

            <div className="input-field w-full flex flex-col gap-2">
              <label className="text-gray-500 poppins text-sm font-medium">
                Languages
              </label>
              {draft?.languages?.map((lan, index) => (
                <div className=" flex w-full justufy-between items-center ">
                  <input
                    key={index}
                    type="text"
                    value={lan}
                    onChange={(e) => {
                      const updated = draft.languages.map((l, i) =>
                        i === index ? e.target.value : l,
                      );
                      setDraft({ ...draft, languages: updated });
                    }}
                    placeholder="Language"
                    className="relative flex-1  px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
                  />
                  <MdDelete
                    onClick={() => handleDelete(index, "languages")}
                    className="text-gray-700 cursor-pointer hover:text-gray-800"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Add Experience ────────────────────────────────────── */}
        {userEdit === "exp" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Add Experience Details</h1>

            {[
              {
                label: "Role",
                name: "role",
                placeholder: "FrontEnd, Back-End",
              },
              {
                label: "Company Name",
                name: "companyName",
                placeholder: "Company name",
              },
            ].map(({ label, name, placeholder }) => (
              <div
                key={name}
                className="input-field w-full flex flex-col gap-1"
              >
                <label className="text-gray-500 poppins text-sm font-medium">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  onChange={(e) =>
                    setInputExpForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  placeholder={placeholder}
                  className="relative px-3 py-2 text-gray-800 outline-none border-b border-b-[#bcd4e6]"
                />
              </div>
            ))}

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
                placeholder="Write a short summary about your experience..."
                rows={5}
                maxLength={500}
                className="relative px-3 py-2 text-gray-800 outline-none border border-[#bcd4e6] rounded-md resize-none"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Max 500 characters</span>
                <span>{inputExpForm.description.length || 0}/500</span>
              </div>
            </div>

            <div className="input-field w-full flex flex-col gap-3">
              <label className="text-gray-500 poppins text-sm font-medium">
                Duration
              </label>
              <div className="flex gap-4">
                {[0, 1].map((i) => (
                  <input
                    key={i}
                    type="date"
                    onChange={(e) => handleDurationChange(i, e.target.value)}
                    className="w-1/2 px-3 py-2 border-b border-b-[#bcd4e6]"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Edit Experience ───────────────────────────────────── */}
        {userEdit === "expEdit" && (
          <div className="flex w-full flex-col gap-10 poppins justify-between p-3">
            <h1 className="poppins text-xl">Edit Experience Details</h1>

            {draft?.experience?.map((exp, index) => (
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
                      const updated = draft.experience.map((item, i) =>
                        i === index ? { ...item, role: e.target.value } : item,
                      );
                      setDraft({ ...draft, experience: updated });
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
                      const updated = draft.experience.map((item, i) =>
                        i === index ?
                          { ...item, company: e.target.value }
                        : item,
                      );
                      setDraft({ ...draft, experience: updated });
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
                      const updated = draft.experience.map((item, i) =>
                        i === index ?
                          { ...item, description: e.target.value }
                        : item,
                      );
                      setDraft({ ...draft, experience: updated });
                    }}
                    rows={4}
                    maxLength={500}
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
                    {[0, 1].map((i) => (
                      <input
                        key={i}
                        type="date"
                        value={exp?.duration?.[i] || ""}
                        onChange={(e) => {
                          const updated = draft.experience.map((item, idx) => {
                            if (idx !== index) return item;
                            const newDuration = [
                              ...(item.duration || ["", ""]),
                            ];
                            newDuration[i] = e.target.value;
                            return { ...item, duration: newDuration };
                          });
                          setDraft({ ...draft, experience: updated });
                        }}
                        className="w-1/2 px-3 py-2 border-b border-[#bcd4e6]"
                      />
                    ))}
                  </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />
              </div>
            ))}
          </div>
        )}

        {/* ── Profile Image ─────────────────────────────────────── */}
        {userEdit === "profileImage" && (
          <div className="flex flex-col gap-6 p-3 poppins">
            <h1 className="text-xl text-center">
              Add Your Recent Profile Picture
            </h1>

            <div className="flex flex-col gap-6 items-center">
              <div className="relative w-20 h-20 min-h-10 min-w-10">
                <div className="w-full h-full bg-gray-700 rounded-full shadow-lg ring-3 ring-green-600 overflow-hidden flex items-center justify-center">
                  {previewImage || draft?.profileImage ?
                    <img
                      src={previewImage || draft?.profileImage}
                      alt="profile-img"
                      className="w-full h-full object-cover"
                    />
                  : <h1 className="text-3xl font-bold text-white">
                      {draft?.fname?.toUpperCase().slice(0, 2)}
                    </h1>
                  }
                </div>
              </div>

              <h3 className="poppins">Upload profile picture</h3>
              <p className="poppins text-xs text-gray-600">
                Profile with a photo has a higher chance of getting noticed by
                recruiters
              </p>

              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  id="profileUpload"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="profileUpload"
                  className="px-4 py-2 bg-[#4485fd] text-white rounded-4xl cursor-pointer hover:opacity-90"
                >
                  Choose image
                </label>
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

        {/* ── Submit Button ─────────────────────────────────────── */}
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            userEdit === "profileImage" ?
              "rounded-4xl bg-[#4485fd]"
            : "rounded-sm bg-[#6ca0dc]"
          } hover-btn tracking-wide w-full py-2 my-2 text-white cursor-pointer disabled:opacity-60`}
        >
          {isLoading ?
            "Saving..."
          : userEdit === "profileImage" ?
            "Upload Image"
          : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default ProfileEdit;
