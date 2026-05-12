import React from "react";

const JobDetailsSkeleton = () => {
  return (
    <section className="fixed w-full h-screen overflow-y-auto custom-scroll z-30 md:relative md:z-0 md:p-2 top-0 left-0 animate-pulse">
      <div
        className="bg-white flex flex-col gap-5 w-full tracking-wide 
        rounded-lg sm:rounded-3xl sm:shadow-lg 
        ring-1 ring-[#bcd4e6]/50 px-5 py-4 overflow-hidden"
      >
        {/* Top Close Button */}
        <div className="w-full flex justify-end md:hidden">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col gap-3 w-[70%]">
              <div className="h-8 w-[65%] rounded-lg bg-gray-200" />
              <div className="h-5 w-[40%] rounded-lg bg-gray-200" />
            </div>

            {/* Logo */}
            <div
              className="w-15 h-15 min-w-[60px] rounded-3xl 
              bg-gray-200 ring-1 ring-[#bcd4e6]"
            />
          </div>

          {/* Meta Info */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="h-4 w-28 rounded-md bg-gray-200" />
              <div className="h-4 w-24 rounded-md bg-gray-200" />
            </div>

            <div className="h-4 w-36 rounded-md bg-gray-200" />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-5 mt-2">
            <div className="h-11 w-32 rounded-3xl bg-gray-200" />
            <div className="h-5 w-16 rounded-md bg-gray-200" />
            <div className="h-4 w-20 rounded-md bg-gray-200" />
          </div>
        </div>

        <hr className="border-t border-gray-100" />

        {/* Description */}
        <article className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="h-6 w-40 rounded-md bg-gray-200" />

            <div className="flex flex-col gap-2">
              <div className="h-4 w-full rounded-md bg-gray-200" />
              <div className="h-4 w-[95%] rounded-md bg-gray-200" />
              <div className="h-4 w-[80%] rounded-md bg-gray-200" />
            </div>

            <div className="h-5 w-52 rounded-md bg-gray-200 mt-2" />
          </div>

          <hr className="border-t border-gray-100" />

          {/* Responsibilities */}
          <div className="flex flex-col gap-3">
            <div className="h-5 w-48 rounded-md bg-gray-200" />

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-[90%] rounded-md bg-gray-200 ml-5"
              />
            ))}
          </div>

          {/* Job Info */}
          <div className="flex flex-col gap-3">
            <div className="h-4 w-56 rounded-md bg-gray-200" />
            <div className="h-4 w-48 rounded-md bg-gray-200" />
            <div className="h-4 w-52 rounded-md bg-gray-200" />
            <div className="h-4 w-44 rounded-md bg-gray-200" />
          </div>

          {/* Education */}
          <div className="flex flex-col gap-3">
            <div className="h-5 w-28 rounded-md bg-gray-200" />

            <div className="flex flex-col gap-2">
              <div className="h-4 w-full rounded-md bg-gray-200" />
              <div className="h-4 w-[85%] rounded-md bg-gray-200" />
            </div>
          </div>

          <hr className="border-t border-gray-100" />

          {/* Skills */}
          <div className="flex flex-col gap-4">
            <div className="h-5 w-24 rounded-md bg-gray-200" />

            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-20 rounded-full bg-gray-200" />
              <div className="h-8 w-24 rounded-full bg-gray-200" />
              <div className="h-8 w-16 rounded-full bg-gray-200" />
              <div className="h-8 w-28 rounded-full bg-gray-200" />
              <div className="h-8 w-20 rounded-full bg-gray-200" />
            </div>
          </div>

          <hr className="border-t border-gray-100" />
        </article>
      </div>
    </section>
  );
};

export default JobDetailsSkeleton;
