import axios from "axios";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../ContextApis/ContextProvider";

/**
 * LoginForm.jsx
 * Tech: React + TailwindCSS + react-hook-form
 */
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = use(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    // await new Promise((r) => setTimeout(r, 700));
    // alert("Login success!\n" + JSON.stringify(data, null, 2));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
        { withCredentials: true } // for cookei
      );

      if (res.data) {
        toast.success("Login successful 🎉");
        navigate("/reel");
        setUser(res.data.user); //  instantly context update
      }
    } catch (error) {
      toast.error("Something is wrong 🎉");
    }

    // reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="mt-1 text-gray-500 text-sm">Login to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`mt-1 w-full rounded-xl border bg-white p-3 pr-12 outline-none transition focus:ring-2 focus:ring-emerald-500/60 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password", {
                    required: "Password is required",
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

            {/* Remember */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  {...register("remember")}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-700 select-none"
                >
                  Remember me
                </label>
              </div>

              <a
                href="#"
                className="text-sm font-medium text-emerald-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Logging in…" : "Login"}
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
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-emerald-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
