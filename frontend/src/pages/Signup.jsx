import { useState } from "react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true); // toggle signup/signin
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regex.test(value));
    setEmail(value);
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
    setIsEmailValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password,
      mode: isSignup ? "signup" : "signin",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 transition-colors">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white text-center">
          {isSignup ? "Create your account" : "Sign in to your account"}
        </h1>
        <p className="text-sm text-gray-400 text-center mt-1">
          Skill Qualifier Platform
        </p>

        {/* Google Sign In */}
        <button className="mt-6 cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-700 rounded-lg py-2.5 text-sm font-medium text-gray-200 hover:bg-gray-800 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name field only for signup */}
          {isSignup && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition bg-gray-800 text-white ${
                email.length === 0
                  ? "border border-gray-700 focus:ring-indigo-500"
                  : isEmailValid
                  ? "border border-green-500 focus:ring-green-500"
                  : "border border-red-500 focus:ring-red-500"
              }`}
              required
            />
            {!isEmailValid && email.length > 0 && (
              <p className="text-xs text-red-500 mt-1">Enter a valid email</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition bg-gray-800 text-white border ${
                isEmailValid
                  ? "border-gray-700 focus:ring-indigo-500"
                  : "border-gray-700/50 cursor-not-allowed"
              }`}
              required
              disabled={!isEmailValid}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isEmailValid || (isSignup && name.trim() === "")}
            className={`w-full cursor-pointer py-2.5 rounded-lg font-semibold transition ${
              isEmailValid && (!isSignup || name.trim() !== "")
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-indigo-400/60 text-white cursor-not-allowed"
            }`}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-xs text-gray-400 text-center mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
