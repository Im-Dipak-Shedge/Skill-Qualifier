import { useRef, useState } from "react";
import api from "../apis/axios";

export default function Home() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file); // must match multer field name

    try {
      const res = await api.post("/upload", formData);

      console.log("Upload success:", res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F4FBF6] px-6 py-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#3F7D20]">
          Upload Your Resume
        </h1>
        <p className="mt-3 text-[#4B6B57]">
          Let us analyze your resume and map your skills accurately
        </p>
      </div>

      {/* Upload Card */}
      <div
        className="mt-14 max-w-3xl mx-auto bg-white rounded-3xl p-12
        shadow-[0_30px_60px_-20px_rgba(63,125,32,0.35)]"
      >
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-[#91C499]/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#3F7D20]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 16v-8m0 0l-3 3m3-3l3 3" />
              <path d="M20 16.5a4.5 4.5 0 00-3.5-4.38" />
              <path d="M4 16.5a4.5 4.5 0 013.5-4.38" />
            </svg>
          </div>

          <h2 className="mt-6 text-xl font-semibold text-[#1F2933]">
            Choose your resume
          </h2>
          <p className="text-sm text-[#6B7280] mt-1">
            PDF, DOC or DOCX (max 5MB)
          </p>

          {/* File input */}
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => fileRef.current.click()}
            className="mt-6 px-6 py-3 rounded-xl
            border-2 border-[#3F7D20] text-[#3F7D20]
            font-medium hover:bg-[#3F7D20] hover:text-white
            transition"
          >
            Select File
          </button>

          {file && (
            <p className="mt-4 text-sm text-[#374151]">
              Selected: <strong>{file.name}</strong>
            </p>
          )}

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={!file}
            className={`mt-8 w-full  max-w-xs py-3 rounded-xl font-semibold transition-all
              ${
                file
                  ? "bg-[#3F7D20] cursor-pointer text-white hover:shadow-lg hover:-translate-y-[1px]"
                  : "bg-[#91C499]/40 text-[#4B6B57] cursor-not-allowed"
              }`}
          >
            Upload Resume
          </button>
        </div>
      </div>

      {/* Info */}
      {/* Features */}
      <section className="mt-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-3xl font-semibold text-[#3F7D20]">
            How SkillQualifier Helps
          </h2>
          <p className="text-center mt-3 text-base text-[#4B6B57]">
            Simple steps to improve your career profile
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Resume Parsing",
                desc: "Automatically extract skills, experience, and key details from your resume.",
              },
              {
                title: "Skill Mapping",
                desc: "Match your profile with relevant roles and identify missing skills.",
              },
              {
                title: "Actionable Insights",
                desc: "Get clear recommendations to improve your resume and career chances.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6
          border border-[#91C499]/40
          hover:border-[#3F7D20]/50
          transition"
              >
                <h3 className="text-lg font-semibold text-[#3F7D20]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#4B6B57]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
