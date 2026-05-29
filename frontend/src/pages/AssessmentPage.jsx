import { useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

export default function AssessmentPage() {
  const location = useLocation();

  const assessmentData = location.state?.assessmentData;

  const questions = assessmentData?.questions || [];
  const role = assessmentData?.role || "Role";

  const totalQuestions = questions.length;

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const current = questions[currentQuestion];

  const progress =
    totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0) || 0;

  return (
    <main className="min-h-screen bg-[#F4FBF6] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-3xl px-8 py-6 shadow-[0_25px_60px_-25px_rgba(63,125,32,0.35)] border border-[#91C499]/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left */}
            <div>
              <h1 className="text-3xl font-extrabold text-[#3F7D20]">
                Technical Assessment
              </h1>
              <p className="mt-2 text-[#4B6B57] text-sm max-w-2xl">
                Role: <span className="font-semibold">{role}</span> • Answer
                carefully. Progress is tracked automatically.
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <div className="bg-[#F4FBF6] border border-[#91C499]/30 rounded-2xl px-5 py-3 min-w-[120px]">
                <p className="text-xs text-[#4B6B57]">Progress</p>
                <h3 className="text-lg font-bold text-[#3F7D20]">
                  {currentQuestion + 1}/{totalQuestions}
                </h3>
              </div>

              <div className="bg-[#3F7D20] rounded-2xl px-5 py-3 text-white min-w-[120px]">
                <p className="text-xs opacity-80">Time Left</p>
                <h3 className="text-lg font-bold">20:00</h3>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-3 rounded-full bg-[#91C499]/20 overflow-hidden">
            <div
              className="h-full bg-[#3F7D20] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <section className="mt-10 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
          {/* ================= QUESTION SECTION ================= */}
          <div className="bg-white rounded-3xl border border-[#91C499]/20 shadow-[0_25px_60px_-25px_rgba(63,125,32,0.30)] overflow-hidden">
            {/* Top Info Bar */}

            {/* QUESTION CARD AREA */}
            <div className="p-8">
              {current ? (
                <QuestionCard
                  questionData={current}
                  selectedAnswer={current.selectedAnswer}
                  onSelectAnswer={(ans) => {
                    // later store answers here
                    console.log(ans);
                  }}
                />
              ) : (
                <div className="text-center text-[#4B6B57] py-20">
                  No Questions Found
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="px-8 py-6 border-t border-[#91C499]/20 flex justify-between">
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion((p) => p - 1)}
                className="px-6 py-3 rounded-xl border-2 border-[#91C499] text-[#4B6B57] font-semibold disabled:opacity-40"
              >
                Previous
              </button>

              <button
                onClick={() => setCurrentQuestion((p) => p + 1)}
                disabled={currentQuestion === totalQuestions - 1}
                className="px-8 py-3 rounded-xl bg-[#3F7D20] text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                Next Question
              </button>
            </div>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="bg-white rounded-3xl border border-[#91C499]/20 shadow-[0_25px_60px_-25px_rgba(63,125,32,0.30)] p-6 sticky top-6 h-fit">
            <h2 className="text-2xl font-bold text-[#3F7D20]">
              Assessment Info
            </h2>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-sm text-[#4B6B57]">Total Questions</p>
                <h3 className="text-xl font-bold text-[#1F2933]">
                  {totalQuestions}
                </h3>
              </div>

              <div>
                <p className="text-sm text-[#4B6B57]">Role</p>
                <h3 className="text-xl font-bold text-[#1F2933]">{role}</h3>
              </div>

              <div>
                <p className="text-sm text-[#4B6B57]">Current Question</p>
                <h3 className="text-xl font-bold text-[#1F2933]">
                  {currentQuestion + 1}
                </h3>
              </div>

              <div>
                <p className="text-sm text-[#4B6B57]">Total Marks</p>
                <h3 className="text-2xl font-bold text-[#3F7D20]">
                  {totalMarks}
                </h3>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-10 bg-[#F4FBF6] border border-[#91C499]/20 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-[#3F7D20]">Instructions</h4>

              <ul className="mt-3 space-y-2 text-sm text-[#4B6B57]">
                <li>• Each question has different marks</li>
                <li>• Do not refresh the page</li>
                <li>• Timer auto-submits test</li>
                <li>• Review answers before moving ahead</li>
              </ul>
            </div>

            {/* Submit */}
            <button className="mt-8 w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:shadow-lg transition">
              Submit Assessment
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
}
