import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employerRegisterSchema } from "../../features/validations/employerRegisterSchema";
import { createUser } from "../../redux/user/authSlice";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../utils/toastIndicator";
const EmployerRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employerRegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...filterData } = data;

      const res = await dispatch(
        createUser({
          ...filterData,
          userType: "employer",
        }),
      );

      if (createUser.fulfilled.match(res)) {
        showSuccess("Employer registered");
        navigate("/login");
      } else {
        showError(res.payload?.message || "Register failed");
      }
    } catch (error) {
      showError(error.message || "Register failed : Please try again");
    }
  };

  return (
    <section className="min-h-screen w-full">
      <div className="w-full flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-[90%] max-w-100 poppins rounded-md ring-1 shadow-lg ring-[#bcd4e6] flex flex-col gap-2 px-5 py-6"
        >
          <h1 className="font-bold text-xl text-gray-700 text-center my-2">
            Employer Registration
          </h1>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              Enter name
            </label>
            <input
              type="text"
              {...register("fname")}
              placeholder="Full name"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.fname?.message}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              Enter email
            </label>
            <input
              type="text"
              {...register("mail")}
              placeholder="abc@mail.com"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.mail?.message}</p>
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-1">
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

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              Enter password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
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

          {/* Company Details */}
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
            <p className="text-red-700 text-xs">
              {errors.companyName?.message}
            </p>

            <input
              type="text"
              {...register("companyLocation")}
              placeholder="Company Location"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm bg-white"
            />
            <p className="text-red-700 text-xs">
              {errors.companyLocation?.message}
            </p>

            <input
              type="text"
              {...register("companyEmail")}
              placeholder="Company Email"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm bg-white"
            />
            <p className="text-red-700 text-xs">
              {errors.companyEmail?.message}
            </p>

            {/* Optional fields */}
            <input
              type="text"
              {...register("description")}
              placeholder="Company description (optional)"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm bg-white"
            />

            <input
              type="text"
              {...register("website")}
              placeholder="Company website (optional)"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm bg-white"
            />
          </div>

          <button
            type="submit"
            className="bg-[#6ca0dc] hover:opacity-90 w-full py-2 my-2 text-white rounded-sm transition-all"
          >
            Register Employer
          </button>

          <div className="text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link className="text-[#6ca0dc] underline" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EmployerRegister;
