import { useEffect, useState } from "react";

export default function SkillConfirmation({
  skills = [],
  rating = 0,
  onConfirm,
  onCancel,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 50);
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleCancel = () => {
    setShow(false);
    setTimeout(onCancel, 300);
  };

  const handleConfirm = () => {
    setShow(false);
    setTimeout(onConfirm, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${show ? "opacity-100" : "opacity-0"}
        `}
        onClick={handleCancel}
      />

      {/* Modal */}
      <div
        className={`
          relative w-full max-w-3xl mx-4
          bg-white rounded-3xl p-8
          shadow-[0_40px_80px_-25px_rgba(63,125,32,0.45)]
          transition-all duration-300 ease-out
          ${
            show
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-6"
          }
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#3F7D20]">
              Confirm Extracted Skills
            </h2>
            <p className="mt-1 text-sm text-[#4B6B57]">
              Please review the extracted skills before continuing
            </p>
          </div>

          <div className="px-4 py-1 rounded-full bg-[#3F7D20] text-white font-semibold">
            {rating}/10
          </div>
        </div>

        {/* Rating Bar */}
        <div className="mt-5">
          <div className="h-3 rounded-full bg-[#91C499]/30 overflow-hidden">
            <div
              className="h-full bg-[#3F7D20] transition-all"
              style={{ width: `${Math.min(rating * 10, 100)}%` }}
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mt-7">
          <h3 className="text-lg font-semibold text-[#3F7D20] mb-3">
            Detected Skills
          </h3>

          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="
                  px-4 py-1.5 rounded-full text-sm font-medium
                  bg-[#F4FBF6] text-[#3F7D20]
                  border border-[#91C499]/60
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="
              px-6 py-2.5 rounded-xl font-semibold
              border-2 border-[#91C499]
              text-[#4B6B57]
              hover:bg-[#F4FBF6]
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="
              px-6 py-2.5 rounded-xl font-semibold
              bg-[#3F7D20] text-white
              hover:shadow-lg hover:-translate-y-[1px]
              transition
            "
          >
            Confirm Skills
          </button>
        </div>
      </div>
    </div>
  );
}
