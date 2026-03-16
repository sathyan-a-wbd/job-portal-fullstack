import React from "react";
import { IoSearch } from "react-icons/io5";

const Searchbar = ({ inputFocus }) => {
  return (
    <div
      className={` order-3 ${inputFocus ? "order-4  -z-10 translate-y-35" : " "} fixed left-0 sm:z-0 sm:translate-y-0 -translate-y-150  sm:relative sm:opacity-100 sm:flex w-full lg:order-3 sm:order-4 lg:w-auto transition-all duration-500 flex items-center justify-center`}
    >
      <form className={`searchbar} w-full`}>
        {/* searchbar */}
        <div className="searchbox  w-full overflow-hidden flex flex-col sm:flex-row items-center rounded-4xl sm:ring-1 ring-0 sm:ring-[#bcd4e6] px-1 pr-3 shadow ">
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
            className={`flex gap-1 w-full sm:w-auto items-center tracking-wider cursor-pointer justify-center bg-[#4485fd] text-white rounded-4xl px-3 py-3 `}
          >
            <span className="flex items-center gap-1 md:text-sm ">
              <IoSearch className="font-bold text-white " /> Search
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
