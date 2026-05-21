import React, { useState } from "react";
import { FaRegBell, FaUser, FaUserAlt } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import NavbarProfileDashboard from "../NavbarProfileDashboard";
import Searchbar from "../Searchbar";
import { useSelector } from "react-redux";
import ActivityDropdown from "../SmallComponets/ActivityDropdown";
import { FaChevronDown, FaBookmark, FaFileAlt } from "react-icons/fa";
import J from "../../../public/J.webp";
import Jobist from "../../../public/jobist.webp";
const SeekNav = () => {
  const [userHover, setUserHover] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [visibleNav, setVisibleNav] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleProtectedRoute = (path) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    navigate(path);
  };

  return (
    <section className={`w-full sm:shadow roboto sm:bg-white`}>
      <div className="w-full flex z-10 flex-wrap text-gray-600 gap-y-5 items-center justify-between px-4 sm:px-10 py-5 relative">
        {/* mobile-nav-bar-icon */}
        <div className="flex items-center justify-between relative sm:hidden w-10">
          <HiMiniBars3BottomLeft
            onClick={() => setMobileNav((prev) => !prev)}
            className={`${mobileNav ? "opacity-0 scale-75 pointer-events-none " : "opacity-100 scale-100"} absolute left-0 transition-all duration-300 text-2xl block sm:hidden z-20 font-bold cursor-pointer text-shadow`}
          />
          <IoClose
            onClick={() => setMobileNav(false)}
            className={`${mobileNav ? "opacity-100 scale-100 " : "opacity-0 scale-75 pointer-events-none"} absolute left-0 transition-all duration-300 text-2xl block sm:hidden z-20 font-bold cursor-pointer text-shadow`}
          />
        </div>

        {/* Mobile-navbar */}
        <nav
          className={`sm:order-2 text-gray-800 scroll-smooth custom-scroll-hidden sm:hidden poppins fixed w-[80%] bg-[#f4f9fd] border border-gray-200 transition-transform duration-500 ease-in-out rounded-r-3xl shadow-2xl backdrop:blur-3xl h-screen overflow-y-auto  top-0 left-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ul className="px-3 py-20 h-screen flex flex-col gap-5 items-center tracking-wider">
            <h3 className="w-full text-left px-1 text-sm tracking-widest text-[#4485fd]">
              Jobist<span className="text-red-400 text-sm">.com</span>
            </h3>
            <NavbarProfileDashboard
              setMobileNav={setMobileNav}
              setVisibleNav={setVisibleNav}
            />
            <span className="w-full h-0.5  rounded-sm bg-[#4485fd31]">
              {""}
            </span>
            <div className=" flex poppins flex-col gap-3 text-sm items-left w-full px-3 mt-5">
              <h4 className="text-xs text-[#6ca0dc] mb-3">nav-links</h4>
              <Link
                onClick={() => setMobileNav(false)}
                className="text-sm text-[#4485fd]  px-2 py-2 w-full  flex items-center justify-between"
                to={"/"}
              >
                Home
                <FaAnglesRight />
              </Link>
              <Link
                onClick={() => setMobileNav(false)}
                className="text-sm text-[#4485fd]  px-2 py-2 w-full  flex items-center justify-between"
                to={"/jobs-list"}
              >
                Jobs
                <FaAnglesRight />
              </Link>
              <div
                onClick={() => setMobileNav(false)}
                className=" relative w-full mb-4 border border-white/10 rounded-2xl shadow-xl p-3 z-50 animate-fadeIn"
              >
                <h4 className="text-xs text-[#6ca0dc] mb-3">Activity</h4>
                <div className="flex flex-col gap-2">
                  {/* Saved Jobs */}
                  <button
                    onClick={() => handleProtectedRoute("/saved-jobs")}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FaBookmark className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800">Saved Jobs</h3>
                      <p className="text-xs text-gray-500">
                        View your bookmarked jobs
                      </p>
                    </div>
                  </button>

                  {/* Applications */}
                  <button
                    onClick={() => handleProtectedRoute("/my-applications")}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <FaFileAlt className="text-green-600" />
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800">
                        My Applications
                      </h3>
                      <p className="text-xs text-gray-500">
                        Track application status
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </ul>
        </nav>
        {/* //logo */}

        <div className="logo order-1 text-2xl font-semibold tracking-wider">
          <h3 className="text-[#4485fd] text-lg sm:text-xl">
            Jobist<span className="text-red-400 text-lg sm:text-xl">.com</span>
          </h3>
        </div>
        {/* navlinks */}
        <nav className="order-2 sm:block hidden">
          <ul className="flex gap-5 poppins text-sm items-center tracking-wide">
            <li className="hover:text-[#6ca0dc] font-medium text-gray-600  poppins transition-all duration-300 ease-in-out">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="hover:text-[#6ca0dc] font-medium text-gray-600 poppins transition-all duration-300 ease-in-out">
              <Link to={"/jobs-list"}>Jobs</Link>
            </li>
            <ActivityDropdown currentUser={currentUser} />
          </ul>
        </nav>
        {/* search-bar */}

        <Searchbar />

        {/* profile and notification */}
        <nav className="order-3 lg:order-4">
          <ul className="flex items-center gap-5">
            <div className="hidden items-center justify-center relative sm:flex">
              <FaUserAlt
                className="text-xl text-shadow cursor-pointer"
                onMouseEnter={() => setUserHover(true)}
                onClick={() => setUserHover(true)}
              />
              {userHover === true && (
                <div
                  onMouseEnter={() => setUserHover(true)}
                  onMouseLeave={() => setUserHover(false)}
                  className="absolute w-fit whitespace-nowrap top-6 right-0  backdrop:blur  border-white/40 px-4 py-3"
                >
                  <NavbarProfileDashboard />
                </div>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default SeekNav;
