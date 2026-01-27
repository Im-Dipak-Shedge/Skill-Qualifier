import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // no navbar if not logged in

  const avatarUrl =
    user.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name || user.email,
    )}&background=6366f1&color=fff`;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold text-[#3F7D20] cursor-pointer"
        >
          Skill Qualifier
        </h1>

        {/* User section */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {user.name || "User"}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <img
            src={avatarUrl}
            alt="avatar"
            className="h-8 w-8 rounded-full object-cover border"
          />

          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 rounded-lg text-sm cursor-pointer font-semibold
              bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
