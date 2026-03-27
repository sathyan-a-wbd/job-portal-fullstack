import React, { useEffect, useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../redux/user/userSlice";
import { GetProfile } from "../services/api";

const NavbarProfileDashboard = ({ setMobileNav }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);

  const { user, loading } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await GetProfile();
      setUserInfo(res);
    };
    fetchUser();
  }, []);
  return (
    <ul className="flex flex-col w-full">
      {!token ?
        <div>
          <Link
            to={"/login"}
            onClick={() => dispatch(setIsLogin(true))}
            className="text-sm text-[#4485fd] cursor-pointer border-b-[#6ca0dc] px-2 py-2 w-full rounded-lg flex items-center justify-between"
          >
            Login <FaAnglesRight />
          </Link>
          <Link
            to={"/register"}
            className="text-sm text-[#4485fd] cursor-pointer  border-b-[#6ca0dc] px-2 py-2 w-full rounded-lg flex items-center justify-between"
          >
            SignUp <FaAnglesRight />
          </Link>
        </div>
      : <div
          className={`flex  gap-5 items-center bg-white inset-shadow-5xs justify-start w-full ring-1 ring-[#bcd4e6] sm:ring-0 sm:ring-[#bcd4e6] px-5 py-5 rounded-xl shadow`}
        >
          <div
            className={`w-20 h-20 min-h-20 min-w-20 overflow-hidden bg-[#6ca0dc2f] rounded-full  ring-3 ring-green-500`}
          >
            <Link
              onClick={() => {
                setMobileNav(false);
              }}
              className={"flex items-center justify-center"}
              to={"/profile-dashboard"}
            >
              {userInfo?.profileImage ?
                <img
                  src={userInfo?.profileImage}
                  alt="profile-img"
                  loading="lazy"
                />
              : <FaUserAlt
                  color="#4485fd"
                  className="text-7xl translate-y-2 "
                />
              }
            </Link>
          </div>
          <div className="">
            <h2 className="text-lg">{userInfo?.fname}</h2>
            <span className="text-sm text-gray-500 text-wrap max-w-80">
              {userInfo?.educations[0].courseName}
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
          </div>
        </div>
      }
    </ul>
  );
};

export default NavbarProfileDashboard;
