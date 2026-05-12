import React from "react";

const JobCardSkeleton = () => {
  return (
    <div className="bg-white animate-pulse">
      <div
        className="flex flex-col gap-5 w-full rounded-xl sm:rounded-3xl 
        sm:shadow-lg ring-1 ring-[#bcd4e6]/40 px-5 py-4 bg-white border border-gray-100
        shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between py-2">
          <div className="flex flex-col gap-3 w-[75%]">
            <div className="h-6 sm:h-7 w-[70%] rounded-lg bg-gray-200" />
            <div className="h-4 sm:h-5 w-[45%] rounded-lg bg-gray-200" />
          </div>

          {/* Company Logo */}
          <div
            className="w-15 h-15 min-w-[60px] rounded-3xl 
            bg-gray-200 ring-1 ring-[#bcd4e6]"
          />
        </div>

        {/* Job Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <div className="h-4 w-24 rounded-md bg-gray-200" />
            <div className="h-4 w-28 rounded-md bg-gray-200" />
          </div>

          <div className="h-4 w-32 rounded-md bg-gray-200" />

          {/* Description */}
          <div className="flex flex-col gap-2 w-[90%]">
            <div className="h-4 w-full rounded-md bg-gray-200" />
            <div className="h-4 w-[95%] rounded-md bg-gray-200" />
            <div className="h-4 w-[70%] rounded-md bg-gray-200" />
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="h-6 w-16 rounded-full bg-gray-200" />
            <div className="h-6 w-20 rounded-full bg-gray-200" />
            <div className="h-6 w-14 rounded-full bg-gray-200" />
            <div className="h-6 w-24 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-4 w-24 rounded-md bg-gray-200" />
          <div className="h-4 w-16 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
