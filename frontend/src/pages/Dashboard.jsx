import React, { useEffect, useState } from "react";
import { GetProfile } from "../services/api";
import { FaUserAlt } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdCake, MdOutlineAlternateEmail } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
const Dashboard = ({ image }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // {
  //     fname: "Sathyan",
  //     mail: "sathyan.dev@gmail.com",
  //     mobile: "9876543210",
  //     location: "Chennai, Tamil Nadu",
  //     dob: "15 Aug 2002",

  //     // New fields
  //     profileSummary:
  //       "Frontend developer skilled in React.js, building responsive and user-friendly web applications. Passionate about learning backend technologies and becoming a full-stack developer.",

  //     skills: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Git"],

  //     languages: ["English", "Tamil"],

  //     // Career preferences (arrays as requested)
  //     jobPrefrence: ["Full-Time", "Remote", "Frontend Developer"],
  //     availabilty: "Immediate",
  //     preferredLocation: ["Chennai", "Bangalore", "Remote"],

  //     // Experience array
  //     experience: [
  //       {
  //         role: "Frontend Developer Intern",
  //         company: "Tech Solutions",
  //         duration: ["Jan 2025", "Mar 2025"],
  //         description:
  //           "Worked on building responsive UI components using React and Tailwind CSS.",
  //       },
  //       {
  //         role: "Freelance Web Developer",
  //         company: "Self-employed",
  //         duration: ["Jan 2025", "Mar 2025"],
  //         description:
  //           "Developed small business websites and optimized UI performance.",
  //       },
  //     ],

  //     // Education array
  //     educations: [
  //       {
  //         courseName: "B.Sc Computer Science",
  //         collegeName: "Madras University",
  //         duration: ["2022", "2025"],
  //       },
  //       {
  //         courseName: "Higher Secondary",
  //         collegeName: "ABC Higher Secondary School",
  //         duration: ["2025", "2028"],
  //       },
  //     ],
  //   }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await GetProfile();
        setUser(user);
        if (user) {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <section className="w-full absolute left-0 top-0 h-screen flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  return (
    <section className="w-full px-6 justify-center roboto flex my-5 ">
      <div className="flex flex-col w-[600px] max-w-[600px]  justify-center gap-5">
        {/* name && profileimage */}
        <div className="flex items-center w-full justify-between">
          <h3 className="text-2xl tracking-widest text-gray-700 font-semibold">
            {user?.fname?.toUpperCase()}
          </h3>
          <div
            className={`w-15 h-15 min-h-10 min-w-10 overflow-hidden bg-gray-700 rounded-full  ring-3 ring-gray-700`}
          >
            <div className={"flex h-full items-center justify-center"}>
              {image ?
                <img src={image} alt="profile-img" loading="lazy" />
              : <h1 className="text-3xl font-bold text-white">
                  {user?.fname?.toUpperCase().slice(0, 2)}
                </h1>
              }
            </div>
          </div>
        </div>
        {/* Contact details */}
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Basic details</h2>
            <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
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
            <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
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
            <button className="poppins text-sm text-[#4485fd]">Add</button>
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
                  <FiEdit2
                    size={20}
                    className=" cursor-pointer text-gray-700"
                  />
                </div>
                <span className="text-sm poppins">
                  {education?.collegeName}
                </span>
                <span className="text-sm poppins">
                  {education?.duration.join(" - ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Profile summary</h2>
            <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
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
            <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
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
            <button className="poppins text-sm text-[#4485fd]">Add</button>
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
                  <FiEdit2
                    size={20}
                    className=" cursor-pointer text-gray-700"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Experience</h2>
            <button className="poppins text-sm text-[#4485fd]">Add</button>
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
                  <FiEdit2
                    size={20}
                    className=" cursor-pointer text-gray-700"
                  />
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
      </div>
    </section>
  );
};

export default Dashboard;
