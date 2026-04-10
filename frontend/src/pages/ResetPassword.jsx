import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/newApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      await API.post(`/api/users/reset-password/${token}`, {
        password: data.password,
      });

      toast.success("Password updated successfully");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="h-screen w-full">
      <div className="w-full h-full flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-[90%] max-w-100 poppins rounded-md items-center justify-center ring-1 shadow-lg ring-[#bcd4e6] flex flex-col gap-4 px-5 py-6"
        >
          <h1 className="font-bold text-xl poppins my-2 text-gray-700">
            Reset Password
          </h1>

          <p className="text-sm text-gray-500 text-center">
            Enter your new password below
          </p>

          {/* Password */}
          <div className="input-field w-full flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              placeholder="Enter new password"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div className="input-field w-full flex flex-col gap-1">
            <label className="text-gray-500 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm password"
              className="px-3 py-2 outline-none ring-1 ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">
              {errors.confirmPassword?.message}
            </p>
          </div>

          {/* Submit */}
          <button
            className="bg-[#6ca0dc] hover-btn tracking-wide w-full py-2 my-2 text-white rounded-sm cursor-pointer"
            type="submit"
          >
            Update Password
          </button>

          {/* Back to login */}
          <div className="text-sm text-gray-500">
            <span>
              Back to{" "}
              <Link className="text-[#6ca0dc] underline" to="/login">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
