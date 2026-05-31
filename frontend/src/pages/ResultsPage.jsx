import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  useEffect(() => {
    if (!result) navigate("/assessment");
  }, [result, navigate]);

  if (!result) return null;

  const {
    obtainedMarks,
    totalMarks,
    answeredCount,
    correctAnswers,
    wrongAnswers = 0,
    percentage,
    totalQuestions,
  } = result;

  const unanswered = totalQuestions - answeredCount;
  const score = Number(percentage);

  const getPerformance = () => {
    if (score >= 90)
      return {
        title: "Excellent",
        icon: "🏆",
        color: "text-green-600",
      };

    if (score >= 75)
      return {
        title: "Good",
        icon: "🚀",
        color: "text-green-500",
      };

    if (score >= 60)
      return {
        title: "Satisfactory",
        icon: "📘",
        color: "text-orange-500",
      };

    if (score >= 40)
      return {
        title: "Needs Improvement",
        icon: "📌",
        color: "text-orange-600",
      };

    return {
      title: "Try Again",
      icon: "💪",
      color: "text-red-500",
    };
  };

  const performance = getPerformance();

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3F7D20] to-[#4f9b29] px-8 py-8 text-white">
          <h1 className="text-3xl font-bold">Assessment Results</h1>
          <p className="text-green-100 mt-1">
            Assessment completed successfully
          </p>
        </div>

        <div className="p-8">
          {/* Top Section */}
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-center">
            {/* Score Circle */}
            <div className="flex justify-center">
              <div className="relative">
                <svg width="190" height="190">
                  <circle
                    cx="95"
                    cy="95"
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />

                  <circle
                    cx="95"
                    cy="95"
                    r={radius}
                    fill="none"
                    stroke="#3F7D20"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 95 95)"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="text-4xl font-bold text-slate-900">
                    {score}%
                  </h2>
                  <span className="text-sm text-slate-500">Final Score</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{performance.icon}</span>

                <div>
                  <h2 className={`text-2xl font-bold ${performance.color}`}>
                    {performance.title}
                  </h2>

                  <p className="text-slate-500">
                    Overall assessment performance
                  </p>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <div className="bg-white border border-green-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Marks Obtained
                      </p>

                      <p className="text-3xl font-bold text-slate-900 mt-1">
                        {obtainedMarks}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      🏆
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Total Marks
                      </p>

                      <p className="text-3xl font-bold text-slate-900 mt-1">
                        {totalMarks}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      📊
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-purple-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Attempted
                      </p>

                      <p className="text-3xl font-bold text-slate-900 mt-1">
                        {answeredCount}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      ✍️
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mt-10">
            <div className="border border-green-200 bg-green-50 rounded-2xl p-5">
              <p className="text-sm text-green-600 font-medium">Correct</p>

              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {correctAnswers}
              </h3>
            </div>

            <div className="border border-red-200 bg-red-50 rounded-2xl p-5">
              <p className="text-sm text-red-500 font-medium">Wrong</p>

              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {wrongAnswers}
              </h3>
            </div>

            <div className="border border-orange-200 bg-orange-50 rounded-2xl p-5">
              <p className="text-sm text-orange-500 font-medium">Skipped</p>

              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {unanswered}
              </h3>
            </div>

            <div className="border border-blue-200 bg-blue-50 rounded-2xl p-5">
              <p className="text-sm text-blue-500 font-medium">Questions</p>

              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                {totalQuestions}
              </h3>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-slate-900 mb-5">
              Performance Breakdown
            </h3>

            <div className="space-y-5">
              <ProgressRow
                label="Correct Answers"
                value={correctAnswers}
                total={totalQuestions}
                color="bg-green-500"
              />

              <ProgressRow
                label="Wrong Answers"
                value={wrongAnswers}
                total={totalQuestions}
                color="bg-red-500"
              />

              <ProgressRow
                label="Skipped Questions"
                value={unanswered}
                total={totalQuestions}
                color="bg-orange-500"
              />
            </div>
          </div>

          {/* Footer Summary */}
          <div className="mt-10 border-t pt-6">
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-slate-500">Total Questions</p>
                <p className="text-xl font-bold text-slate-900">
                  {totalQuestions}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Marks Obtained</p>
                <p className="text-xl font-bold text-slate-900">
                  {obtainedMarks}/{totalMarks}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Final Percentage</p>
                <p className="text-xl font-bold text-[#3F7D20]">{score}%</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => navigate("/")}
              className="flex-1 h-12 rounded-xl border border-slate-300 font-medium hover:bg-slate-50 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProgressRow({ label, value, total, color }) {
  const percent = total ? (value / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-slate-600">{label}</span>

        <span className="font-semibold text-slate-900">
          {value} ({percent.toFixed(0)}%)
        </span>
      </div>

      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
