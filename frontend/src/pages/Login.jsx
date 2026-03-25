import React from "react";
import { useForm } from "react-hook-form";
import { LoginUser } from "../services/api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../features/validations/loginSchema";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const res = await LoginUser(data);
   
      localStorage.setItem("token", res);
      alert("Logged in successfully");
      navigate("/profile-dashboard", { replace: true });
    } catch (err) {
      console.log("Login Error:", err);
    }
  };
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/profile-dashboard" replace />;
  }
  return (
    <section className="h-screen w-full">
      <div className="w-full h-full flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-[90%] max-w-100 poppins rounded-md items-center justify-center ring-1 shadow-lg ring-[#bcd4e6] flex flex-col gap-4 px-5 py-6"
        >
          <h1 className="font-bold text-xl poppins my-2 text-gray-700">
            {" "}
            Login to your account
          </h1>

          <div className="input-field w-full flex flex-col gap-1  ">
            <label
              htmlFor="input"
              className=" text-gray-500 poppins text-sm font-medium "
            >
              Enter mail or mobile
            </label>
            <input
              type="text"
              {...register("identifier")}
              placeholder="Email or Mobile"
              className="relative px-3 py-2 outline-none ring-1 poppins ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.identifier?.message}</p>
          </div>
          <div className="input-field w-full flex flex-col gap-1 ">
            <div className="flex items-center justify-between">
              <label
                htmlFor="input"
                className=" text-gray-500 text-sm poppins font-medium"
              >
                Enter password
              </label>
              <Link className="text-[#6ca0dc] text-sm font-medium">
                Forgot ?
              </Link>
            </div>
            <input
              type="password"
              {...register("password")}
              placeholder="password "
              className="relative px-3 py-2 outline-none ring-1 poppins ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.password?.message}</p>
          </div>

          <button
            className="bg-[#6ca0dc] hover-btn tracking-wide w-full py-2 my-2 text-white rounded-sm cursor-pointer"
            type="submit"
          >
            Login now
          </button>
          <div className="text-sm text-gray-500">
            <span>
              Don't have an account ?{" "}
              <Link className="text-[#6ca0dc] underline" to={"/register"}>
                Register
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
