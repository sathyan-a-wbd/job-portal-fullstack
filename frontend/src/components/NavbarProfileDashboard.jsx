import React from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarProfileDashboard = ({ userStatus, image }) => {
  return (
    <ul className="flex flex-col w-full">
      {!userStatus ?
        <div>
          <li className="text-sm text-[#6ca0dc] border-b-[#6ca0dc] px-2 py-2 w-full rounded-lg flex items-center justify-between">
            Login <FaAnglesRight />
          </li>
          <li className="text-sm text-[#6ca0dc]  border-b-[#6ca0dc] px-2 py-2 w-full rounded-lg flex items-center justify-between">
            SignUp <FaAnglesRight />
          </li>
        </div>
      : <div
          className={`flex flex-col gap-5 items-center inset-shadow-5xs justify-start w-full px-5 py-5 rounded-xl `}
        >
          <h2 className="text-lg">Name Initial</h2>
          <span className="text-sm text-gray-500">xyz-xxxssss</span>
          <li>
            <Link
              to={"/profile-dashboard"}
              className="text-[16px] text-[#4485fd]"
            >
              View & Update{" "}
            </Link>
          </li>
        </div>
      }
    </ul>
  );
};

export default NavbarProfileDashboard;
