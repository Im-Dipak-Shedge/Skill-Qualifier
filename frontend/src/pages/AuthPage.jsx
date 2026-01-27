import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "./../apis/axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
export default function AuthPage() {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

  // State for form values
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(value));
    setFormData((prev) => ({ ...prev, email: value }));
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ fullname: "", email: "", password: "" });
    setIsEmailValid(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle signup
  const handleSignup = async () => {
    try {
      const res = await api.post("/auth/signup", formData);
      toast.success(res.data.message);
      setFormData({ fullname: "", email: "", password: "" });
    } catch (err) {
      const message =
        err.response?.data?.message || "Signup failed. Please try again.";
      toast.info(message);
      return;
    }
  };

  // Handle signin
  const handleSignin = async () => {
    try {
      const res = await api.post("/auth/signin", formData);
      login(res.data.user);
      navigate("/home");
    } catch (err) {
      const message =
        err.response?.data?.message || "Signin failed. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Signin Failed",
        text: message,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignup ? handleSignup() : handleSignin();
  };

  const googleResponse = async (authResult) => {
    try {
      const res = await api.post("/auth/google", {
        credential: authResult.credential,
      });
      login(res.data.user);
      navigate("/home");
    } catch (err) {
      console.log("error while signin with google  :", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      <div
        className="w-full max-w-md rounded-2xl p-8
        bg-white/80 backdrop-blur-xl
        border border-gray-200
        shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]"
      >
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-900 text-center tracking-tight">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-md text-gray-500 text-center mt-2">
          Skill Qualifier Platform
        </p>

        {/* Google Login */}
        <div className="mt-6 flex justify-center">
          <div className="transition-transform hover:scale-[1.05]">
            <GoogleLogin
              onSuccess={googleResponse}
              onError={googleResponse}
              flow="auth-code"
              width="360px"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-xl
                  bg-white text-gray-900
                  border border-gray-300
                  shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => validateEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-4 py-2.5 rounded-xl
                bg-white text-gray-900 shadow-sm
                focus:outline-none focus:ring-2 transition
                ${
                  formData.email.length === 0
                    ? "border border-gray-300 focus:ring-indigo-500/60"
                    : isEmailValid
                      ? "border border-green-500 focus:ring-green-500/60"
                      : "border border-red-500 focus:ring-red-500/60"
                }`}
              required
            />
            {!isEmailValid && formData.email.length > 0 && (
              <p className="text-xs text-red-600 mt-1">Enter a valid email</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={!isEmailValid}
              className={`w-full px-4 py-2.5 rounded-xl
                bg-white text-gray-900 shadow-sm
                border focus:outline-none focus:ring-2 transition
                ${
                  isEmailValid
                    ? "border-gray-300 focus:ring-indigo-500/60"
                    : "border-gray-200 cursor-not-allowed opacity-70"
                }`}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              !isEmailValid || (isSignup && formData.fullname.trim() === "")
            }
            className={`w-full py-3 rounded-xl font-semibold text-white
              transition-all duration-300
              ${
                isEmailValid && (!isSignup || formData.fullname.trim() !== "")
                  ? "bg-gradient-to-r  from-[#3F7D20] to-green-700 hover:shadow-lg hover:-translate-y-[1px] cursor-pointer"
                  : "bg-gradient-to-r from-indigo-300 to-purple-300 cursor-not-allowed"
              }`}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-xs text-gray-500 text-center mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-[#91C499] cursor-pointer hover:underline font-medium"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
