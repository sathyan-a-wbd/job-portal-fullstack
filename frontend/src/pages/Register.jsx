import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../features/validations/registerSchema";
import { CreateUser } from "../services/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema), mode: "onChange" });
  const navigate = useNavigate();
  const selectedUserType = watch("userType");

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...filterData } = data;
      const res = await CreateUser(filterData);
      alert("✅ User created:");
      navigate("/login");
    } catch (error) {
      alert("Login failed : Plase try again");
    }
  };

  return (
    <section className="min-h-screen w-full">
      <div className="w-full flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-[90%] max-w-100 poppins rounded-md ring-1 shadow-lg ring-[#bcd4e6] flex flex-col gap-2 px-5 py-6"
        >
          <h1 className="font-bold text-xl text-gray-700 poppins my-2 text-center">
            Create an account
          </h1>

          {/* 1. Name */}
          <div className="input-field w-full flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              Enter name
            </label>
            <input
              type="text"
              {...register("fname")}
              placeholder="Enter full name"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.fname?.message}</p>
          </div>

          {/* 2. Email */}
          <div className="input-field w-full flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              Enter mail
            </label>
            <input
              type="text"
              {...register("mail")}
              placeholder="abc@mail.com"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.mail?.message}</p>
          </div>

          {/* 3. MOBILE FIELD (Added Back) */}
          <div className="input-field w-full flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              Enter mobile
            </label>
            <input
              type="text"
              {...register("mobile")}
              placeholder="10 digit mobile number"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.mobile?.message}</p>
          </div>

          {/* 4. User Type */}
          <div className="input-field w-full flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              User type
            </label>
            <select
              {...register("userType")}
              className="px-3 text-gray-600 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            >
              <option value="">Select user</option>
              <option value="jobseeker">Job seeker</option>
              <option value="employer">Recruiter</option>
            </select>
            <p className="text-red-700 text-xs">{errors.userType?.message}</p>
          </div>

          {/* Dynamic Recruiter Fields */}
          {selectedUserType === "employer" && (
            <div className="w-full flex flex-col gap-2 mt-2 p-3 bg-gray-50 rounded-md border border-dashed border-[#bcd4e6]">
              <h2 className="text-sm font-bold text-gray-600 mb-1">
                Company Details
              </h2>
              <input
                type="text"
                {...register("companyName")}
                placeholder="Company Name"
                className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm bg-white"
              />
              <input
                type="text"
                {...register("companyLocation")}
                placeholder="Company Location"
                className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm bg-white"
              />
              <input
                type="text"
                {...register("website")}
                placeholder="Company website"
                className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm bg-white"
              />
            </div>
          )}

          {/* 5. Password */}
          <div className="input-field w-full flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              Enter password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="password"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.password?.message}</p>
          </div>

          {/* 6. Confirm Password */}
          <div className="input-field w-full flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              Confirm password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm password"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            type="submit"
            className="bg-[#6ca0dc] hover:opacity-90 w-full py-2 my-2 text-white rounded-sm transition-all"
          >
            Create account
          </button>

          <div className="text-sm text-gray-500 text-center">
            <span>
              Already have an account?{" "}
              <Link className="text-[#6ca0dc] underline" to={"/login"}>
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
