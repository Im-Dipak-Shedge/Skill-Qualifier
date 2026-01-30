import { useNavigate } from "react-router-dom";

export default function ChooseMethod() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F4FBF6] px-6 py-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#3F7D20]">
          How would you like to continue?
        </h1>
        <p className="mt-3 text-[#4B6B57]">
          Choose the option that works best for you
        </p>
      </div>

      {/* Options */}
      <div className="mt-14 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Upload Resume */}
        <div
          className="bg-white rounded-3xl p-10 border border-[#91C499]/40
          hover:border-[#3F7D20] hover:shadow-xl transition cursor-pointer"
          onClick={() => navigate("/upload-resume")}
        >
          <h2 className="text-2xl font-semibold text-[#3F7D20]">
            Upload Resume
          </h2>

          <p className="mt-3 text-[#4B6B57]">
            Upload your resume and let us automatically extract your skills and
            experience.
          </p>

          <ul className="mt-5 text-sm text-[#4B6B57] space-y-2">
            <li>• PDF recommended</li>
            <li>• DOCX supported (best effort)</li>
            <li>• Takes less than a minute</li>
          </ul>

          <button
            className="mt-8 px-6 py-3 rounded-xl bg-[#3F7D20] text-white
            font-semibold hover:shadow-lg transition"
          >
            Upload Resume
          </button>
        </div>

        {/* Manual Entry */}
        <div
          className="bg-white rounded-3xl p-10 border border-[#91C499]/40
          hover:border-[#3F7D20] hover:shadow-xl transition cursor-pointer"
          onClick={() => navigate("/manual-entry")}
        >
          <h2 className="text-2xl font-semibold text-[#3F7D20]">
            Enter Skills Manually
          </h2>

          <p className="mt-3 text-[#4B6B57]">
            Prefer not to upload a resume? Just enter your skills and experience
            directly.
          </p>

          <ul className="mt-5 text-sm text-[#4B6B57] space-y-2">
            <li>• No resume needed</li>
            <li>• Full control over your data</li>
            <li>• Takes 2–3 minutes</li>
          </ul>

          <button
            className="mt-8 px-6 py-3 rounded-xl border-2 border-[#3F7D20]
            text-[#3F7D20] font-semibold hover:bg-[#3F7D20] hover:text-white
            transition"
          >
            Enter Manually
          </button>
        </div>
      </div>
    </main>
  );
}
