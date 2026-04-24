import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout, setCurrenUser } from "../redux/user/authSlice";
const NavbarProfileDashboard = ({ setMobileNav, setVisibleNav }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(setCurrenUser());
    navigate("/");
  };
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="flex flex-col w-full">
      {!token ?
        <div className="shadow-lg rounded-2xl bg-white px-10 py-4">
          <Link
            to={"/login"}
            onClick={() => setMobileNav && setMobileNav(false)}
            className="text-sm text-[#4485fd] cursor-pointer border-b-[#6ca0dc] px-2 py-2 w-full rounded-lg flex items-center justify-between"
          >
            Login <FaAnglesRight />
          </Link>
          <Link
            to={"/register"}
            onClick={() => setMobileNav && setMobileNav(false)}
            className="text-sm text-[#4485fd] cursor-pointer  border-b-[#6ca0dc] px-2 py-2 w-full rounded-lg flex items-center justify-between"
          >
            SignUp <FaAnglesRight />
          </Link>
        </div>
      : <div
          className={`flex  gap-5 items-center bg-white inset-shadow-5xs justify-start w-full ring-1 ring-[#bcd4e6] sm:ring-0 sm:ring-[#bcd4e6] px-5 py-5 rounded-xl shadow`}
        >
          <div>
            {/* className={`w-20 h-20 min-h-20 min-w-20 overflow-hidden bg-[#6ca0dc2f] rounded-full  ring-3 ring-green-500`}[  ] */}
            <Link
              className={"flex items-center justify-center"}
              to={"/profile-dashboard"}
            >
              <div className="relative w-20 h-20 min-h-10 min-w-10">
                {/* Image wrapper */}
                <div className="w-full h-full bg-gray-700 rounded-full shadow-lg ring-3 ring-green-600 overflow-hidden flex items-center justify-center">
                  {currentUser?.profileImage ?
                    <img
                      src={currentUser?.profileImage}
                      alt="profile-img"
                      className="w-full h-full object-cover"
                    />
                  : <h1 className="text-3xl font-bold text-white">
                      {currentUser?.fname?.toUpperCase().slice(0, 2)}
                    </h1>
                  }
                </div>
              </div>
            </Link>
          </div>
          <div className="">
            <h2 className="text-lg">{currentUser?.fname}</h2>
            <span className="text-sm text-gray-500 text-wrap max-w-80">
              {currentUser?.educations?.length > 0 ?
                currentUser.educations[0].courseName
              : currentUser?.companyName}
            </span>
            <li
              onClick={() => {
                setMobileNav(false);
              }}
            >
              <Link
                to={"/profile-dashboard"}
                className="text-[16px]  text-[#4485fd]"
              >
                View & Update{" "}
              </Link>
            </li>
            <button
              type="button"
              onClick={handleLogOut}
              className="text-sm underline cursor-pointer text-[#647daa]"
            >
              Log out
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default NavbarProfileDashboard;
