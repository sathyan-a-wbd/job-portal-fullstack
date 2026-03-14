import React, { useState } from "react";
import { FaRegBell, FaUser, FaUserAlt } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import NavbarProfileDashboard from "./NavbarProfileDashboard";
const NavBar = ({ image }) => {
  const [notification, setNotification] = useState(10);
  const [inputFocus, setInputFocus] = useState(false);
  const [userHover, setUserHover] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <section className="w-full shadow roboto">
      <div className="w-full flex flex-wrap text-gray-600 gap-y-5 items-center justify-between px-4 sm:px-10 py-5 relative">
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
          className={`sm:order-2 text-gray-800 sm:hidden  fixed w-[80%] bg-[#f4f9fd] border border-gray-200 transition-transform duration-500 ease-in-out rounded-r-3xl shadow-2xl backdrop:blur-3xl h-screen top-0 left-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ul className="px-3 py-20 h-screen flex flex-col gap-5 items-center tracking-wider">
            <h3 className="w-full text-left px-1 text-sm tracking-widest text-[#4485fd]">
              Jobist<span className="text-red-400 text-sm">.com</span>
            </h3>
            <div
              className={`flex gap-5 items-center inset-shadow-5xs justify-start ring-1 ring-[#bcd4e6] w-full px-5 py-5 rounded-xl shadow`}
            >
              <div
                className={`w-20 h-20 overflow-hidden bg-[#6ca0dc2f] rounded-full flex items-center justify-center ring-3 ring-green-500`}
              >
                {image ?
                  <img src={image} alt="profile-img" loading="lazy" />
                : <FaUserAlt
                    color="#4485fd"
                    className="text-7xl translate-y-1 "
                  />
                }
              </div>
              <div>
                <h2 className="text-lg">Name Initial</h2>
                <span className="text-sm text-gray-500">xyz-xxxssss</span>
                <li onClick={() => setMobileNav(false)}>
                  <Link
                    to={"/profile-dashboard"}
                    className="text-[16px] text-[#4485fd]"
                  >
                    View & Update{" "}
                  </Link>
                </li>
              </div>
            </div>
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
            </div>
          </ul>
        </nav>
        {/* //logo */}

        <div className="logo order-1 text-2xl font-semibold tracking-wider">
          <h3 className="text-[#4485fd]">
            Jobist<span className="text-red-400 text-xl">.com</span>
          </h3>
        </div>
        {/* navlinks */}
        <nav className="order-2 sm:block hidden">
          <ul className="flex gap-5 items-center tracking-wide">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/jobs-list"}>Jobs</Link>
            </li>
          </ul>
        </nav>
        {/* search-bar */}
        <div
          className={` order-3 ${inputFocus ? "order-4  -z-10 translate-y-35" : " "} fixed left-0 sm:z-0 sm:translate-y-0 -translate-y-150  sm:relative sm:opacity-100 sm:flex w-full lg:order-3 sm:order-4 lg:w-auto transition-all duration-500 flex items-center justify-center`}
        >
          <form className={`searchbar} w-full`}>
            {/* searchbar */}
            <div className="searchbox  w-full overflow-hidden flex flex-col sm:flex-row items-center rounded-4xl sm:ring-2 ring-0 sm:ring-[#6ca0dc] px-1 ">
              <input
                type="text"
                placeholder="Enter Job title, Company name, etc"
                className={`px-4 py-5 flex-1 border-none outline-none w-full `}
              />

              <span className="w-[90%] h-0.5 sm:w-0.5 sm:h-10 sm:bg-gray-200 bg-gray-100 shadow-lg"></span>

              <input
                type="text"
                placeholder="Enter location"
                className="px-4 py-5 w-full border-none outline-none sm:w-[30%]"
              />

              <button
                className={`flex gap-1 w-full sm:w-auto items-center tracking-wider cursor-pointer justify-center bg-[#4485fd] text-white rounded-4xl px-3 py-4 `}
              >
                <span className="flex items-center gap-1 md:text-sm ">
                  Find Jobs{" "}
                  <IoSearch className="font-bold text-white text-xl" />{" "}
                </span>
              </button>
            </div>
          </form>
        </div>
        {/* profile and notification */}
        <nav className="order-3 lg:order-4">
          <ul className="flex items-center gap-5">
            {inputFocus ?
              <IoClose
                className="font-bold  sm:hidden text-xl cursor-pointer"
                onClick={() => setInputFocus(false)}
              />
            : <IoSearch
                className="font-bold sm:hidden block text-xl cursor-pointer"
                onClick={() => setInputFocus((prev) => !prev)}
              />
            }
            <div className={`cursor-pointer relative  inline-block `}>
              <FaRegBell className="text-xl text-shadow " />
              {notification === 0 ?
                ""
              : <span className=" text-xs text-white absolute w-4 h-4 -top-2 -right-2 rounded-full flex items-center justify-center bg-amber-500">
                  {notification}
                </span>
              }
            </div>
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
                  className="absolute min-w-40 w-40 top-6 right-0 bg-[#f8fcff] backdrop:blur rounded-lg border border-white/40 px-4 py-3"
                >
                  <NavbarProfileDashboard userStatus={true} image={image} />
                </div>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
