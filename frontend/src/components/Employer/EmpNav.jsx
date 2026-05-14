import React, { useState } from "react";
import { FaRegBell, FaUser, FaUserAlt } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import NavbarProfileDashboard from "../NavbarProfileDashboard";
import Searchbar from "../Searchbar";

import { CiSquarePlus } from "react-icons/ci";
import { LuPlus } from "react-icons/lu";

const EmpNav = () => {
  const [userHover, setUserHover] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <section className={`w-full sm:shadow roboto sm:bg-white `}>
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
          className={`sm:order-2 text-gray-800 sm:hidden poppins fixed w-[80%] bg-[#f4f9fd] border border-gray-200 transition-transform duration-500 ease-in-out rounded-r-3xl shadow-2xl backdrop:blur-3xl h-screen top-0 left-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ul className="px-3 py-20 h-screen flex flex-col gap-5 items-center tracking-wider">
            <h3 className="w-full text-left px-1 text-sm tracking-widest text-[#4485fd]">
              Jobist<span className="text-red-400 text-sm">.com</span>
            </h3>
            <NavbarProfileDashboard setMobileNav={setMobileNav} />
            <span className="w-full h-0.5  rounded-sm bg-[#4485fd31]">
              {""}
            </span>
            <div className=" flex flex-col gap-3 text-sm items-left w-full px-3 mt-5">
              <h4 className="text-xs text-[#6ca0dc] mb-3">nav-links</h4>
              <Link
                onClick={() => setMobileNav(false)}
                className="text-sm text-[#4485fd]  px-2 py-2 w-full  flex items-center justify-between"
                to={"/"}
              >
                Dashboard
                <FaAnglesRight />
              </Link>
              <Link
                onClick={() => setMobileNav(false)}
                className="flex hover:bg-gray-200 items-center hover:shadow-md uppercase justify-center gap-2 ring-1 ring-[#4485fd] rounded-sm px-3 py-2"
                to={"/post-job"}
              >
                <LuPlus size={18} /> Post a job
              </Link>
            </div>
          </ul>
        </nav>
        {/* //logo */}

        <div className="logo order-1 sm:text-auto text-center text-2xl font-semibold tracking-wider">
          <h3 className="text-[#4485fd] text-lg sm:text-xl">
            Jobist<span className="text-red-400 text-lg sm:text-xl">.com</span>
          </h3>
        </div>

        {/* search-bar */}

        {/* <Searchbar /> */}

        {/* profile and notification */}
        <nav className="order-3 lg:order-4 ">
          <ul className="hidden sm:flex items-center font-medium tracking-wide gap-5">
            {/* navlinks */}
            <li className="hover:text-[#6ca0dc] inter text-sm transition-all duration-300 ease-in-out">
              <Link to={"/"}>Dashboard</Link>
            </li>
            <li className="text-[#6ca0dc] inter text-sm transition-all duration-300 ease-in-out">
              <Link
                to={"/post-job"}
                className="flex hover:shadow-md uppercase justify-center items-center gap-2 ring-1 translate-y-0 hover:-translate-y-1 ring-white/70 text-black hover:text-[#4485fd] transition-all duration-200 ease-in-out hover:ring-[#4485fd] rounded-md px-3 py-2"
              >
                {" "}
                {/* <LuPlus size={18} />  */}
                Post a job
              </Link>
            </li>

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

export default EmpNav;
