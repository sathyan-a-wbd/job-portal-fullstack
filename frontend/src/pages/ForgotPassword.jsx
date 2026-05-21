import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/user/authSlice";
import { showSuccess, showError } from "../utils/toastIndicator";
import { useEffect } from "react";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    document.title = "Forgot Password - Job Portal";
  }, []);
  const onSubmit = async (data) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      showSuccess("Reset link sent to your email");
    } catch (err) {
      showError(err?.message || "Something went wrong");
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
            Forgot Password
          </h1>

          <p className="text-sm text-gray-500 text-center">
            Enter your email and we’ll send you a reset link
          </p>

          {/* Email Field */}
          <div className="input-field w-full flex flex-col gap-1">
            <label className="text-gray-500 poppins text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Enter your email"
              className="px-3 py-2 outline-none ring-1 poppins ring-[#bcd4e6] rounded-sm"
            />
            <p className="text-red-700 text-xs">{errors.email?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            className="bg-[#6ca0dc] hover-btn tracking-wide w-full py-2 my-2 text-white rounded-sm cursor-pointer"
            type="submit"
          >
            Send Reset Link
          </button>

          {/* Back to Login */}
          <div className="text-sm text-gray-500">
            <span>
              Remember your password?{" "}
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

export default ForgotPassword;
