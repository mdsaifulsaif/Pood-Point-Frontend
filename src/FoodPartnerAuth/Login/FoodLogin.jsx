import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { use } from "react";
import { AuthContext } from "../../ContextApis/ContextProvider";

export default function FoodLogin() {
  const { partner, setPartner } = use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/food-partner/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      if (res.data) {
        setPartner(res.data.foodPartner);
        toast.success("Login successful 🎉");
        navigate("/dashboard/addfooditem");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Invalid credentials ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
        <p className="text-sm text-gray-500 mb-6">
          Login to continue sharing your delicious food 🍔
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="flex items-center gap-2 border rounded-xl px-3">
              <FaEnvelope className="shrink-0" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                placeholder="e.g. saiful@example.com"
                className="w-full py-3 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center gap-2 border rounded-xl px-3">
              <FaLock className="shrink-0" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                placeholder="******"
                className="w-full py-3 outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-emerald-600 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
