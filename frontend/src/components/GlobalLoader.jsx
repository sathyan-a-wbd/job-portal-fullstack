import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
const GlobalLoader = () => {
  const loading = useSelector((state) => state.auth.loading);
  if (!loading) return null;
  return (
    <div className="inset-0 z-50 bg-black/20 fixed  flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl "></div>
      <div className="z-10 flex items-center justify-center flex-col gap-2">
        <h3 className="w-full font-semibold poppins text-center px-1 text-4xl tracking-wide text-[#4485fd]">
          Jobist
        </h3>
        <ThreeDots
          color="#4485fd"
          width="80"
          height="80"
          radius="9"
          ariaLabel="three-dots-loading"
          visible={true}
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default GlobalLoader;
