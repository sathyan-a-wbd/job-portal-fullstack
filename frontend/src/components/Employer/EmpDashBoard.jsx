import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { VscSymbolNamespace } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";
import { MdCake, MdOutlineAlternateEmail } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";

import { IoLink } from "react-icons/io5";

const EmpDashBoard = () => {
  const { currentUser: user } = useSelector((state) => state.auth);
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
          </ul>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Company details</h2>
            <Link className="" to={"/profile-edit/?userEdit=companyDetails"}>
              <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
            </Link>
          </div>
          <ul className="flex flex-col poppins gap-4">
            {/* details */}
            <li className="flex text-gray-600 items-center gap-2">
              <VscSymbolNamespace size={20} />
              <span className="text-sm poppins">{user?.companyName}</span>
            </li>
            <li className="flex text-gray-600 items-center gap-2">
              <IoMailOpenOutline size={20} />
              <span className="text-sm poppins">{user?.companyEmail}</span>
            </li>
            <li className="flex text-gray-600 items-center gap-2">
              <TiLocation size={20} />
              <span className="text-sm poppins">{user?.companyLocation}</span>
            </li>

            <Link
              className="flex text-gray-600 items-center gap-2 cursor-pointer hover:text-blue-600"
              to={user?.website || "#"}
              target="_blank"
            >
              <IoLink size={20} />
              <span className="text-sm poppins">
                {user?.website || "Add your company website"}
              </span>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col gap-4 poppins justify-between rounded-xl shadow-lg p-5">
          <div className="flex items-center justify-between">
            {/* editoption */}
            <h2 className="poppins font-medium">Company description</h2>
            <Link to={"/profile-edit/?userEdit=companyDescription"}>
              <FiEdit2 size={20} className=" cursor-pointer text-gray-700" />
            </Link>
          </div>
          <ul className="flex flex-col poppins gap-4">
            {/* details */}
            <li className="flex text-gray-600 flex-col justify-center gap-2">
              <p className="text-sm poppins justify ">{user?.description}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EmpDashBoard;
