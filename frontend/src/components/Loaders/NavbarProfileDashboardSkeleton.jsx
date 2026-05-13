import React from "react";

const NavbarProfileDashboardSkeleton = () => {
  return (
    <div className="flex flex-col w-full animate-pulse">
      <div className="flex gap-5 items-center bg-white justify-start w-full ring-1 ring-[#bcd4e6] px-5 py-5 rounded-xl shadow">
        {/* Profile Image Skeleton */}
        <div className="w-20 h-20 rounded-full bg-gray-300"></div>

        {/* Content Skeleton */}
        <div className="flex flex-col gap-3 w-full">
          {/* Name */}
          <div className="h-5 w-40 bg-gray-300 rounded-md"></div>

          {/* Education / Company */}
          <div className="h-4 w-60 bg-gray-200 rounded-md"></div>

          {/* View & Update */}
          <div className="h-4 w-28 bg-gray-200 rounded-md"></div>

          {/* Logout */}
          <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default NavbarProfileDashboardSkeleton;
