import React from "react";

const ApplicantViewSkeleton = () => {
  return (
    <div
      className="relative rounded-2xl border border-gray-100 bg-white p-4 
      shadow-sm overflow-hidden animate-pulse"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="h-12 w-12 rounded-full 
            bg-gray-200"
          />

          {/* Name + Date */}
          <div className="flex flex-col gap-2">
            <div className="h-5 w-36 rounded-md bg-gray-200" />
            <div className="h-3 w-24 rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Status */}
        <div className="h-6 w-20 rounded-lg bg-gray-200" />
      </div>

      {/* Info Section */}
      <div className="space-y-3 py-3 border-y border-gray-50 my-3">
        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-200 shrink-0" />

          <div className="h-4 w-48 rounded-md bg-gray-200" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-200 shrink-0" />

          <div className="h-4 w-32 rounded-md bg-gray-200" />
        </div>

        {/* Experience */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-200 shrink-0" />

          <div className="flex flex-col gap-2">
            <div className="h-3 w-20 rounded-md bg-gray-200" />
            <div className="h-4 w-28 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-4">
        <div className="flex-[2] h-11 rounded-xl bg-gray-200" />

        <div className="flex-1 h-11 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

export default ApplicantViewSkeleton;
