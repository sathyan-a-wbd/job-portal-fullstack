import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../features/validations/registerSchema";
import { CreateUser } from "../services/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema), mode: "onChange" });
  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...filterData } = data;

      const res = await CreateUser(filterData);

      console.log("✅ User created:", res);

      // optional: reset form or redirect
    } catch (error) {
      console.error("❌ Error:", error.response?.data);
    }
  };
  return (
    <section className="h-screen w-full">
      <div className="w-full flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-[90%] max-w-100 poppins rounded-md items-center justify-center ring-1 shadow-lg ring-[#bcd4e6] flex flex-col gap-2 px-5 py-6"
        >
          <h1 className="font-bold text-xl text-gray-700 poppins my-2">
            {" "}
            Create an account
          </h1>
          <div className="input-field w-full flex flex-col gap-1 ">
            <label
              htmlFor="input"
              className=" text-gray-500 poppins text-sm font-medium"
            >
              Enter name
            </label>
            <input
              type="text"
              name="fname"
              {...register("fname")}
              placeholder="Enter full name "
              className="relative px-3 py-2 outline-none ring-1 poppins ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.fname?.message}</p>
          </div>
          <div className="input-field w-full flex flex-col gap-1 ">
            <label
              htmlFor="input"
              className=" text-gray-500 poppins text-sm font-medium"
            >
              Enter mail
            </label>
            <input
              type="text"
              name="mail"
              {...register("mail")}
              placeholder="abc@mail.com "
              className="relative px-3 py-2 outline-none ring-1 poppins ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.mail?.message}</p>
          </div>
          <div className="input-field w-full flex flex-col gap-1 ">
            <label
              htmlFor="input"
              className=" text-gray-500 poppins text-sm font-medium"
            >
              Enter mobile
            </label>
            <input
              type="text"
              name="mobile"
              {...register("mobile")}
              placeholder="mobile number "
              className="relative px-3 py-2 outline-none ring-1 poppins ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.mobile?.message}</p>
          </div>
          <div className="input-field w-full flex flex-col gap-1 ">
            <label
              htmlFor="input"
              className=" text-gray-500 text-sm poppins font-medium"
            >
              Enter password
            </label>

            <input
              type="password"
              {...register("password")}
              placeholder="password "
              className="relative px-3 py-2 outline-none ring-1 poppins ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.password?.message}</p>
          </div>
          <div className="input-field w-full  flex flex-col gap-1 ">
            <label
              htmlFor="input"
              className=" text-gray-500 poppins text-sm font-medium"
            >
              confirm password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm password "
              className="relative px-3 py-2 outline-none ring-1 poppins ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">
              {errors.confirmPassword?.message}
            </p>
          </div>{" "}
          <div className="input-field w-full flex flex-col gap-1  ">
            <label
              htmlFor="input"
              className=" text-gray-500 poppins text-sm font-medium"
            >
              User type
            </label>
            <select
              id=""
              name="userType"
              {...register("userType")}
              className="relative px-3 text-gray-600 py-2 outline-none ring-1 poppins ring-[#bcd4e6] rounded-sm"
            >
              <option value="">Select user</option>
              <option value="jobseeker">Job seeker</option>
              <option value="employer">Recuriter</option>
            </select>
            <p className="text-red-700 text-xs">{errors.userType?.message}</p>
          </div>
          <div className="text-xs w-full mt-2 text-gray-500">
            <p className="text-left">
              By clicking submit you are agree the{" "}
              <a href="Terms & condition">Terms & condition</a>
            </p>
          </div>
          <button className="bg-[#6ca0dc] hover-btn w-full py-2 my-2 text-white rounded-sm cursor-pointer">
            Create account
          </button>
          <div className="text-sm text-gray-500">
            <span>
              Already have an account ?{" "}
              <Link className="text-[#6ca0dc] underline" to={"/login"}>
                Login
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
