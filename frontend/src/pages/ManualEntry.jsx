import { useState } from "react";
import api from "../apis/axios.js";
export default function ManualEntry() {
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!skills || !experience) {
      setError("Skills and experience are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/manual-entry", {
        skills,
        experienceYears: Number(experience),
        role,
        summary,
      });

      // TODO: navigate to skill review / next step
      console.log("Manual entry submitted");
    } catch (err) {
      setError("Failed to submit details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F4FBF6] px-6 py-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#3F7D20]">
          Enter Your Skills
        </h1>
        <p className="mt-3 text-[#4B6B57]">
          This takes just a minute and helps us personalize your assessment
        </p>
      </div>

      {/* Form */}
      <div className="mt-14 max-w-3xl mx-auto bg-white rounded-3xl p-12 shadow-lg">
        <div className="space-y-6">
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-[#1F2933]">
              Skills <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. JavaScript, React, Node.js, MongoDB"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border
              focus:outline-none focus:ring-2 focus:ring-[#3F7D20]/40"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-[#1F2933]">
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              placeholder="e.g. 1.5"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border
              focus:outline-none focus:ring-2 focus:ring-[#3F7D20]/40"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-[#1F2933]">
              Primary Role / Domain
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border
              focus:outline-none focus:ring-2 focus:ring-[#3F7D20]/40"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-[#1F2933]">
              Short Summary (optional)
            </label>
            <textarea
              rows="4"
              placeholder="Briefly describe your background or goals"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border
              focus:outline-none focus:ring-2 focus:ring-[#3F7D20]/40"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded-lg">
              ❌ {error}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#3F7D20] text-white
            font-semibold hover:shadow-lg transition"
          >
            {loading ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    </main>
  );
}
