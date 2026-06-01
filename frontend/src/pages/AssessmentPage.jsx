import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

export default function AssessmentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const assessmentData = location.state?.assessmentData;

  const questions = assessmentData?.questions || [];
  const role = assessmentData?.role || "Role";

  const totalQuestions = questions.length;

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const current = questions[currentQuestion];

  const progress =
    totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0) || 0;

  const [answers, setAnswers] = useState({});
  const answeredCount = Object.keys(answers).length;
  const [submitted, setSubmitted] = useState(false);
  const unanswered = totalQuestions - Object.keys(answers).length;

  const handleAnswerSelect = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  //submit handlerr
  const handleSubmitAssessment = () => {
    if (submitted) return;
    setSubmitted(true);
    let obtainedMarks = 0;
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      const userAnswer = answers[index];

      if (userAnswer === question.correctAnswer) {
        obtainedMarks += question.marks;
        correctAnswers++;
      }
    });

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

    const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);

    const resultData = {
      obtainedMarks,
      totalMarks,
      answeredCount,
      correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers - unanswered,
      percentage,
      totalQuestions,
    };
    navigate("/results", {
      state: {
        result: resultData,
      },
    });

    console.log(resultData);
  };

  //timer
  const [timeLeft, setTimeLeft] = useState(totalQuestions * 40); // 40s per question
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmitAssessment();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

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

              <div className="bg-red-500 rounded-2xl px-5 py-3 text-white min-w-[120px]">
                <p className="text-xs opacity-80">Time Left</p>
                <h3 className="text-lg font-bold">{formatTime(timeLeft)}</h3>
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
                  selectedAnswer={answers[currentQuestion]}
                  onSelectAnswer={handleAnswerSelect}
                  submitted={submitted}
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
                disabled={submitted || currentQuestion === 0}
                onClick={() => setCurrentQuestion((prev) => prev - 1)}
                className="px-6 py-3 rounded-xl border-2 border-[#91C499] text-[#4B6B57] font-semibold disabled:opacity-40"
              >
                Previous
              </button>

              {currentQuestion === totalQuestions - 1 ? (
                <button
                  disabled={submitted}
                  onClick={handleSubmitAssessment}
                  className="px-8 py-3 rounded-xl bg-red-500 text-white font-semibold hover:shadow-lg transition-all"
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  disabled={submitted}
                  onClick={() => setCurrentQuestion((prev) => prev + 1)}
                  className="px-8 py-3 rounded-xl bg-[#3F7D20] text-white font-semibold hover:shadow-lg transition-all"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside
            className="
    bg-white
    rounded-3xl
    border border-[#91C499]/20
    shadow-[0_25px_60px_-25px_rgba(63,125,32,0.30)]
    p-6
    sticky top-6
    h-fit
    self-start
  "
          >
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-[#3F7D20]">
                Assessment Info
              </h2>
            </div>

            {/* Answer Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
                  Answered
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-600">
                  {answeredCount}
                </h3>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
                <p className="text-xs font-medium text-orange-700 uppercase tracking-wide">
                  Remaining
                </p>

                <h3 className="mt-2 text-3xl font-bold text-orange-500">
                  {unanswered}
                </h3>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-[#91C499]/20" />

            {/* Assessment Details */}
            <div>
              <h3 className="text-sm font-bold text-[#3F7D20] uppercase tracking-wider">
                Assessment Details
              </h3>

              <div className="mt-4 grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4B6B57]">
                    Total Questions
                  </span>

                  <span className="font-bold text-[#1F2933]">
                    {totalQuestions}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4B6B57]">
                    Current Question
                  </span>

                  <span className="font-bold text-[#1F2933]">
                    {currentQuestion + 1}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4B6B57]">Role</span>

                  <span className="font-semibold text-right text-[#1F2933] max-w-[140px] truncate">
                    {role}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4B6B57]">Total Marks</span>

                  <span className="font-bold text-[#3F7D20]">{totalMarks}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 rounded-2xl bg-[#F4FBF6] border border-[#91C499]/20 p-4">
              <h4 className="text-sm font-bold text-[#3F7D20]">Instructions</h4>

              <ul className="mt-3 space-y-2 text-sm text-[#4B6B57]">
                <li>• Each question carries different marks</li>
                <li>• Do not refresh the page</li>
                <li>• Timer will auto-submit the test</li>
                <li>• Review answers before submission</li>
              </ul>
            </div>

            {/* Submit */}
            <button
              disabled={submitted}
              onClick={handleSubmitAssessment}
              className="
      mt-8
      w-full
      py-3.5
      rounded-2xl
      bg-red-500
      text-white
      font-semibold
      hover:bg-red-600
      hover:shadow-lg
      transition-all
       disabled:opacity-50
    disabled:cursor-not-allowed
    "
            >
              Submit Assessment
            </button>
          </aside>
        </section>

        {/* ================= QUESTION NAVIGATOR ================= */}
        <div
          className="
    mt-8
    bg-white
    rounded-3xl
    border border-[#91C499]/20
    shadow-[0_25px_60px_-25px_rgba(63,125,32,0.30)]
    p-6 md:p-8
  "
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h3 className="text-xl font-bold text-[#3F7D20]">
                Question Navigator
              </h3>

              <p className="text-sm text-[#4B6B57] mt-1">
                Jump directly to any question and track completion status
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-xl bg-green-50 border border-green-200">
                <span className="text-sm font-semibold text-green-700">
                  {answeredCount} Answered
                </span>
              </div>

              <div className="px-4 py-2 rounded-xl bg-orange-50 border border-orange-200">
                <span className="text-sm font-semibold text-orange-600">
                  {unanswered} Remaining
                </span>
              </div>

              <div className="px-4 py-2 rounded-xl bg-[#F4FBF6] border border-[#91C499]/30">
                <span className="text-sm font-semibold text-[#3F7D20]">
                  {totalQuestions} Total
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-[#91C499]/15 pt-5">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded bg-[#3F7D20]" />
              <span className="text-[#4B6B57]">Current</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded bg-green-200 border border-green-300" />
              <span className="text-[#4B6B57]">Answered</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded bg-gray-200" />
              <span className="text-[#4B6B57]">Unanswered</span>
            </div>
          </div>

          {/* Question Grid */}
          <div
            className="
      mt-6
      grid
      grid-cols-5
      sm:grid-cols-8
      md:grid-cols-10
      lg:grid-cols-12
      xl:grid-cols-15
      gap-3
    "
          >
            {questions.map((_, index) => (
              <button
                disabled={submitted}
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`
          h-12
          rounded-xl
          font-semibold
          text-sm
          transition-all duration-200

          ${
            currentQuestion === index
              ? "bg-[#3F7D20] text-white shadow-lg scale-[1.03]"
              : answers[index]
                ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }
        `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
