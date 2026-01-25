import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "./../apis/axios";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verifyEmailFun = async () => {
      try {
        await api.post("/auth/verify-email", { token });
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };

    verifyEmailFun();
  }, [token]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 text-center
        bg-white/80 backdrop-blur-xl
        border border-gray-200
        shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]"
      >
        {/* LOADING */}
        {status === "loading" && (
          <>
            <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Verifying your email
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Please wait while we activate your account
            </p>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <div className="mx-auto mb-6 h-14 w-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl">
              ✓
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Email Verified
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Your account is ready. You can sign in now.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:shadow-lg hover:-translate-y-[1px]
              transition-all duration-300"
            >
              Go to Sign In
            </button>
          </>
        )}

        {/* ERROR */}
        {status === "error" && (
          <>
            <div className="mx-auto mb-6 h-14 w-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl">
              ✕
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Verification Failed
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              This link is invalid or has expired.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 w-full py-3 rounded-xl font-semibold
              bg-white text-indigo-600 border border-indigo-300
              hover:bg-indigo-50 transition"
            >
              Back to Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
