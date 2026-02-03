import { useNavigate } from "react-router-dom";

export default function ChooseMethod() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F4FBF6] px-6 py-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#3F7D20]">
          How do you want to continue?
        </h1>
        <p className="mt-3 text-[#4B6B57]">
          Choose the option that fits your resume format
        </p>
      </div>

      {/* Canva Warning */}
      <div
        className="mt-10 max-w-3xl mx-auto bg-yellow-50 border border-yellow-300
rounded-2xl px-6 py-4 flex gap-4 items-start"
      >
        <svg
          className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>

        <p className="text-sm text-yellow-800 leading-relaxed">
          <strong>Important:</strong> Resumes created using{" "}
          <strong>Canva</strong> or design-heavy PDFs often fail text
          extraction.
          <br />
          We strongly recommend <strong>Manual Entry</strong> for Canva resumes.
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
            Best for clean, text-based resumes created in Word or Google Docs.
          </p>

          <ul className="mt-5 text-sm text-[#4B6B57] space-y-2">
            <li>• PDF (text-based) recommended</li>
            <li>• DOCX works best</li>
            <li className="text-red-600 font-medium">
              • Canva resumes may fail
            </li>
          </ul>

          <button
            className="mt-8 w-full px-6 py-3 rounded-xl bg-[#3F7D20]
            text-white font-semibold hover:shadow-lg transition"
          >
            Upload Resume
          </button>
        </div>

        {/* Manual Entry (Recommended) */}
        <div
          className="bg-white rounded-3xl p-10 border border-[#91C499]
          hover:border-[#3F7D20] hover:shadow-xl transition relative cursor-pointer"
          onClick={() => navigate("/manual-entry")}
        >
          <span
            className="absolute top-4 right-4 text-xs font-semibold
            bg-[#3F7D20] text-white px-3 py-1 rounded-full"
          >
            Recommended
          </span>

          <h2 className="text-2xl font-semibold text-[#3F7D20]">
            Enter Skills Manually
          </h2>

          <p className="mt-3 text-[#4B6B57]">
            Skip resume upload. Enter your skills and experience directly.
          </p>

          <ul className="mt-5 text-sm text-[#4B6B57] space-y-2">
            <li>• Works for all resume types</li>
            <li>• No parsing errors</li>
            <li>• Full control over your data</li>
          </ul>

          <button
            className="mt-8 w-full px-6 py-3 rounded-xl
            bg-[#3F7D20] text-white font-semibold hover:shadow-lg transition"
          >
            Enter Manually
          </button>
        </div>
      </div>
    </main>
  );
}
