import React from "react";
import { IoSearch } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { useLocation } from "react-router-dom";
const Searchbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const checkPath =
    path === "/profile-dashboard" ||
    path === "/profile-edit" ||
    path === "/profile-edit/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/empregister" ||
    path === "/forgot-password" ||
    path.startsWith("/reset-password");

  return (
    <div
      className={` order-4 ${checkPath ? "hidden sm:flex" : ""} poppins sm:rounded-0 backdrop:blur-3xl  left-0  sm:z-0 sm:translate-y-0  sm:relative sm:opacity-100 sm:flex w-full lg:order-3 sm:order-4 lg:w-auto transition-all duration-500  rounded-lg sm:rounded-0 sm:px-0 sm:py-0  flex items-center  justify-center`}
    >
      <form onSubmit={""} className={`searchbar  w-full `}>
        {/* searchbar */}
        <div className="searchbox px-3 shadow-[1px_2px_10px_#bcd4e6] sm:shadow  w-full overflow-hidden flex flex-col sm:flex-row items-center rounded-lg sm:rounded-4xl sm:ring-1 ring-0 sm:ring-[#bcd4e6] py-2 sm:py-0  sm:pr-3 ">
          <div className="flex w-full items-center">
            <IoSearch size={20} color="grey" className="font-bold" />
            <input
              type="text"
              placeholder="Enter Job title, Company name, etc"
              className={`py-3 px-4 poppins sm:py-5 flex-1 border-none outline-none w-full `}
            />
          </div>
          <div className="flex w-full items-center">
            <CiLocationOn size={20} className=" text-gray-800 font-bold" />
            <input
              type="text"
              placeholder="Enter location"
              className="py-3 px-4 poppins sm:py-5 w-full border-none outline-none sm:w-full"
            />
          </div>
          <button
            type="submit"
            className={`flex gap-1 poppins w-full sm:w-auto items-center tracking-wider cursor-pointer justify-center bg-[#6ca0dc]  text-white rounded-lg sm:rounded-4xl py-2 px-3 sm:py-3 `}
          >
            <IoSearch className="font-bold text-white " /> Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
