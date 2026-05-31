import { useState } from "react";

export default function QuestionCard({
  questionData,
  selectedAnswer,
  onSelectAnswer,
  submitted,
}) {
  const [hovered, setHovered] = useState(null);

  if (!questionData) return null;

  const { skill, type, question, options, marks } = questionData;

  return (
    <div className="w-full">
      {/* ================= TOP BAR ================= */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Left Tags */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-4 py-1.5 rounded-full bg-[#EAF6ED] text-[#2E5F17] text-xs font-semibold tracking-wide">
            {skill}
          </span>

          <span className="px-4 py-1.5 rounded-full bg-[#F4FBF6] border border-[#91C499]/40 text-[#4B6B57] text-xs font-medium uppercase tracking-wider">
            {type}
          </span>
        </div>

        {/* Marks */}
        <div className="text-sm font-semibold text-[#3F7D20] bg-[#F4FBF6] px-4 py-1.5 rounded-full border border-[#91C499]/30">
          {marks} Marks
        </div>
      </div>

      {/* ================= QUESTION ================= */}
      <div className="mt-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] leading-relaxed">
          {question}
        </h2>

        <p className="mt-2 text-sm text-[#6B7280]">
          Choose the most appropriate answer
        </p>
      </div>

      {/* ================= OPTIONS ================= */}
      <div className="mt-10 space-y-4">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;

          return (
            <button
              disabled={submitted}
              key={index}
              onClick={() => onSelectAnswer(option)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`
                w-full
                group
                relative
                flex items-center gap-5
                text-left
                px-6 py-4
                rounded-2xl
                border
                transition-all duration-200

                ${
                  isSelected
                    ? "bg-[#F4FBF6] border-[#3F7D20] shadow-sm"
                    : "bg-white border-[#E5E7EB] hover:border-[#3F7D20]/50 hover:bg-[#F4FBF6]"
                }
              `}
            >
              {/* Option Index */}
              <div
                className={`
                  w-10 h-10
                  rounded-full
                  flex items-center justify-center
                  font-bold text-sm
                  transition-all

                  ${
                    isSelected
                      ? "bg-[#3F7D20] text-white"
                      : "bg-[#F9FAFB] border border-[#D1D5DB] text-[#4B6B57] group-hover:border-[#3F7D20]"
                  }
                `}
              >
                {String.fromCharCode(65 + index)}
              </div>

              {/* Option Text */}
              <span
                className={`text-sm md:text-base font-medium ${
                  isSelected ? "text-[#1F2933]" : "text-[#374151]"
                }`}
              >
                {option}
              </span>

              {/* Selected Tick */}
              {isSelected && (
                <div className="ml-auto w-5 h-5 rounded-full bg-[#3F7D20] flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              )}

              {/* Hover Glow */}
              {!isSelected && hovered === index && (
                <div className="absolute inset-0 rounded-2xl bg-[#3F7D20]/5 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
