import { useNavigate } from "react-router-dom";

export default function pageNotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#F4FBF6] flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl p-10 text-center border border-[#91C499]/20 shadow-[0_25px_60px_-25px_rgba(63,125,32,0.30)]">
        <div className="text-8xl font-extrabold text-[#3F7D20]">404</div>

        <h1 className="mt-4 text-3xl font-bold text-[#1F2933]">
          Page Not Found
        </h1>

        <p className="mt-3 text-[#4B6B57]">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl border-2 border-[#91C499] text-[#3F7D20] font-semibold"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl bg-[#3F7D20] text-white font-semibold"
          >
            Home
          </button>
        </div>
      </div>
    </main>
  );
}
