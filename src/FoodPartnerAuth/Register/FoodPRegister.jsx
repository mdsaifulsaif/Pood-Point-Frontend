import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router";

export default function FoodPRegister() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Simple validators (Bangladesh mobile format + email)
  const validate = () => {
    const e = {};
    if (!form.name?.trim() || form.name.trim().length < 2) {
      e.name = "কমপক্ষে 2 অক্ষরের নাম দিন";
    }
    // BD mobile: starts with 01 + (3-9) + 8 digits => total 11
    if (!/^01[3-9]\d{8}$/.test(form.mobile)) {
      e.mobile = "সঠিক মোবাইল নম্বর দিন (উদাহরণ: 017XXXXXXXX)";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "সঠিক ইমেইল দিন";
    }
    if (!form.password || form.password.length < 6) {
      e.password = "পাসওয়ার্ড কমপক্ষে 6 অক্ষরের হতে হবে";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/food-partner/register",
        {
          name: form.name.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim(),
          password: form.password,
        },
        { withCredentials: true }
      );

      // success flow

      toast.success("Registration successful ");
      // চাইলে এখানে context এ user সেট করতে পারো, তারপর redirect
      navigate("/login"); // বা navigate("/dashboard")
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Registration failed ❌ আবার চেষ্টা করুন"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Demo-fill (তোমার দেওয়া ডাটা দিয়ে one-click fill)
  const fillDemo = () => {
    setForm({
      name: "saiful",
      mobile: "01727841588",
      email: "saifulisam3@gmail.com",
      password: "dddddd",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-[55px] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Join the community & share your delicious food 🥗
        </p>

        <button
          type="button"
          onClick={fillDemo}
          className="text-xs mb-4 underline text-gray-600"
        >
          Fill with demo data
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="flex items-center gap-2 border rounded-xl px-3">
              <FaUser className="shrink-0" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Saiful"
                className="w-full py-3 outline-none"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium mb-1">Mobile</label>
            <div className="flex items-center gap-2 border rounded-xl px-3">
              <FaPhone className="shrink-0" />
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="e.g. 01727841588"
                className="w-full py-3 outline-none"
              />
            </div>
            {errors.mobile && (
              <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="flex items-center gap-2 border rounded-xl px-3">
              <FaEnvelope className="shrink-0" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. saiful@example.com"
                className="w-full py-3 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center gap-2 border rounded-xl px-3">
              <FaLock className="shrink-0" />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="******"
                className="w-full py-3 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="p-2"
                aria-label="toggle password visibility"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          By signing up, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
