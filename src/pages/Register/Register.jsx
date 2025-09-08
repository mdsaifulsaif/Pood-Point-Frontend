import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

/**
 * RegisterForm.jsx
 * Tech: React + TailwindCSS + react-hook-form
 * Drop this component anywhere and it will just work.
 */
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      terms: false,
    },
    mode: "onTouched", // validate on blur/touch for nicer UX
  });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    // In real app, call your API here
    await new Promise((r) => setTimeout(r, 700));
    alert("Registration success!\n" + JSON.stringify(data, null, 2));

    // Send a POST request
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      data
    );
    if (res.data) {
      return toast.success("Account created successful 🎉");
    }
    reset();
    // reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-1 text-gray-500 text-sm">
            Join us in a minute. It's quick and free.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g., Md. Saiful Islam"
                className={`mt-1 w-full rounded-xl border bg-white p-3 outline-none transition focus:ring-2 focus:ring-emerald-500/60 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`mt-1 w-full rounded-xl border bg-white p-3 outline-none transition focus:ring-2 focus:ring-emerald-500/60 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                    message: "Provide a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone (optional)
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="01xxxxxxxxx"
                className={`mt-1 w-full rounded-xl border bg-white p-3 outline-none transition focus:ring-2 focus:ring-emerald-500/60 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                {...register("phone", {
                  pattern: {
                    value: /^(?:\+?88)?01[3-9]\d{8}$/,
                    message: "Provide a valid BD number",
                  },
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  className={`mt-1 w-full rounded-xl border bg-white p-3 pr-12 outline-none transition focus:ring-2 focus:ring-emerald-500/60 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                    validate: {
                      hasLetter: (v) =>
                        /[A-Za-z]/.test(v) || "Include a letter",
                      hasNumber: (v) => /\d/.test(v) || "Include a number",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 my-auto text-sm text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-type your password"
                  className={`mt-1 w-full rounded-xl border bg-white p-3 pr-12 outline-none transition focus:ring-2 focus:ring-emerald-500/60 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) =>
                      v === passwordValue || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute inset-y-0 right-3 my-auto text-sm text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 select-none"
              >
                I agree to the <span className="underline">Terms</span> &{" "}
                <span className="underline">Privacy Policy</span>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-600">
                {errors.terms.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Creating account…" : "Create account"}
            </button>

            {/* Divider */}
            <div className="relative py-3">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">or</span>
              </div>
            </div>

            {/* Social auth placeholders */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded-xl border border-gray-300 py-2.5 font-medium hover:bg-gray-50"
              >
                Continue with Google
              </button>
              <button
                type="button"
                className="rounded-xl border border-gray-300 py-2.5 font-medium hover:bg-gray-50"
              >
                Continue with GitHub
              </button>
            </div> */}
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-emerald-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
