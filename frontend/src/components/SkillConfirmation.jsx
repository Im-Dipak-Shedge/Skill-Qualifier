// import { useEffect, useState } from "react";

// export default function SkillConfirmation({ resumeData, onConfirm, onCancel }) {
//   const [show, setShow] = useState(false);
//   const [editedSkills, setEditedSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState("");
//   const {
//     skills = [],
//     overall_rating: rating = 0,
//     predicted_roles = [],
//   } = resumeData || {};

//   useEffect(() => {
//     setEditedSkills(
//       skills.filter((s) => s && s.trim() !== "").map((s) => s.trim()),
//     );

//     console.log("predicted_role", predicted_roles);

//     setTimeout(() => setShow(true), 50);
//     document.body.style.overflow = "hidden";
//     return () => (document.body.style.overflow = "auto");
//   }, [skills]);

//   const handleCancel = () => {
//     setShow(false);
//     setTimeout(onCancel, 300);
//   };

//   const handleConfirm = () => {
//     const cleaned = editedSkills.map((s) => s.trim()).filter((s) => s !== "");

//     setShow(false);
//     setTimeout(() => onConfirm(cleaned), 300);
//   };

//   const handleRemove = (skillToRemove) => {
//     setEditedSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
//   };

//   const handleAddSkill = () => {
//     const trimmed = newSkill.trim();
//     if (!trimmed) return;

//     const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, " ");
//     const normalized = normalize(trimmed);
//     const exists = editedSkills.some(
//       (skill) => normalize(skill) === normalized,
//     );

//     if (exists) {
//       setNewSkill("");
//       return;
//     }

//     setEditedSkills((prev) => [...prev, trimmed]);
//     setNewSkill("");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div
//         className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
//           show ? "opacity-100" : "opacity-0"
//         }`}
//         onClick={handleCancel}
//       />

//       {/* Modal */}
//       <div
//         className={`relative w-full max-w-3xl mx-4 bg-white rounded-3xl p-10
//   shadow-[0_50px_100px_-30px_rgba(63,125,32,0.45)]
//   transition-all duration-300 ${
//     show
//       ? "opacity-100 scale-100 translate-y-0"
//       : "opacity-0 scale-95 translate-y-6"
//   }`}
//       >
//         {/* Top Row: Role + Rating */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="px-4 py-1.5 rounded-full bg-[#91C499]/30 text-[#3F7D20] text-sm font-semibold tracking-wide">
//             {predicted_roles[0]}
//           </div>

//           <div className="flex items-center gap-3">
//             <span className="text-sm text-[#4B6B57] font-medium">
//               Resume Score
//             </span>
//             <div className="px-4 py-1.5 rounded-full bg-[#3F7D20] text-white font-bold text-sm shadow-md">
//               {rating}/10
//             </div>
//           </div>
//         </div>

//         {/* Title */}
//         <div>
//           <h2 className="text-2xl font-bold text-[#3F7D20] leading-tight">
//             Confirm & Refine Your Skills
//           </h2>
//           <p className="mt-2 text-sm text-[#4B6B57]">
//             Review detected skills. You may remove incorrect ones or add missing
//             technologies before continuing.
//           </p>
//         </div>

//         {/* Rating Bar */}
//         <div className="mt-6">
//           <div className="h-3 rounded-full bg-[#91C499]/30 overflow-hidden">
//             <div
//               className="h-full bg-[#3F7D20] transition-all duration-500 ease-out"
//               style={{ width: `${Math.min(rating * 10, 100)}%` }}
//             />
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="my-8 h-px bg-[#91C499]/30" />

//         {/* Add Skill Section */}
//         <div className="flex gap-3">
//           <input
//             type="text"
//             value={newSkill}
//             onChange={(e) => setNewSkill(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault(); // prevents accidental form submit
//                 handleAddSkill();
//               }
//             }}
//             placeholder="Add a new technical skill"
//             className="flex-1 px-4 py-2.5 rounded-xl border border-[#91C499]/60
//   focus:outline-none focus:ring-1 focus:ring-[#3F7D20]
//   focus:border-[#3F7D20] transition"
//           />

//           <button
//             onClick={handleAddSkill}
//             className="px-6 py-2.5 rounded-xl bg-[#3F7D20] text-white font-semibold
//       hover:shadow-lg hover:-translate-y-[1px] transition-all"
//           >
//             Add
//           </button>
//         </div>

//         {/* Skills */}
//         <div className="mt-8">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-[#3F7D20]">Skills</h3>
//             <span className="text-sm text-[#4B6B57] font-medium">
//               {editedSkills.length} total
//             </span>
//           </div>

//           <div className="flex flex-wrap gap-3 max-h-56 overflow-y-auto pr-1">
//             {editedSkills.map((skill, i) => (
//               <div
//                 key={i}
//                 className="group flex items-center gap-2 px-4 py-2 rounded-full
//           text-sm font-medium bg-[#F4FBF6]
//           text-[#3F7D20] border border-[#91C499]/60
//           hover:border-[#3F7D20] transition"
//               >
//                 {skill}
//                 <button
//                   onClick={() => handleRemove(skill)}
//                   className="text-[#3F7D20] font-bold
//             opacity-70 group-hover:opacity-100
//             hover:text-red-500 transition"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="my-8 h-px bg-[#91C499]/30" />

//         {/* Actions */}
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={handleCancel}
//             className="px-6 py-2.5 rounded-xl font-semibold
//       border-2 border-[#91C499]
//       text-[#4B6B57]
//       hover:bg-[#F4FBF6]
//       transition"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleConfirm}
//             className="px-8 py-2.5 rounded-xl font-semibold
//       bg-[#3F7D20] text-white cursor-pointer
//       hover:shadow-lg hover:-translate-y-[1px]
//       transition-all"
//           >
//             Confirm Skills
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function SkillConfirmation({ resumeData, onConfirm, onCancel }) {
  const [show, setShow] = useState(false);
  const [editedSkills, setEditedSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [openRoleDropdown, setOpenRoleDropdown] = useState(false);

  const {
    skills = [],
    overall_rating: rating = 0,
    predicted_roles = [],
  } = resumeData || {};
  const [selectedRole, setSelectedRole] = useState(predicted_roles[0] || "");

  useEffect(() => {
    setEditedSkills(
      skills.filter((s) => s && s.trim() !== "").map((s) => s.trim()),
    );

    // Default role = first predicted role
    if (predicted_roles.length > 0) {
      setSelectedRole(predicted_roles[0]);
    }

    setTimeout(() => setShow(true), 50);
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [skills, predicted_roles]);

  const handleCancel = () => {
    setShow(false);
    setTimeout(onCancel, 300);
  };

  const handleConfirm = () => {
    const cleaned = editedSkills.map((s) => s.trim()).filter((s) => s !== "");

    setShow(false);
    setTimeout(() => onConfirm({ skills: cleaned, role: selectedRole }), 300);
  };

  const handleRemove = (skillToRemove) => {
    setEditedSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;

    const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, " ");
    const normalized = normalize(trimmed);

    const exists = editedSkills.some(
      (skill) => normalize(skill) === normalized,
    );

    if (exists) {
      setNewSkill("");
      return;
    }

    setEditedSkills((prev) => [...prev, trimmed]);
    setNewSkill("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleCancel}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-3xl mx-4 bg-white rounded-3xl p-10
        shadow-[0_50px_100px_-30px_rgba(63,125,32,0.45)]
        transition-all duration-300 ${
          show
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-6"
        }`}
      >
        {/* Top Row */}
        <div className="flex items-center justify-between mb-6">
          {/* Role Selector */}
          {predicted_roles.length > 1 ? (
            <div className="relative w-64">
              {/* Selected Role Button */}
              <button
                onClick={() => setOpenRoleDropdown((prev) => !prev)}
                className="
      w-full flex items-center justify-between
      px-5 py-2.5
      rounded-xl
      bg-white
      border border-[#91C499]/60
      shadow-sm
      text-[#2E5F17] font-semibold text-sm
      transition-all duration-200
      hover:border-[#3F7D20]
      hover:shadow-md
      focus:outline-none focus:ring-2 focus:ring-[#3F7D20]/40
    "
              >
                {selectedRole}
                <span
                  className={`transition-transform duration-300 ${
                    openRoleDropdown ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Dropdown */}
              <div
                className={`
      absolute left-0 right-0 mt-2
      bg-white rounded-xl shadow-lg
      border border-[#91C499]/40
      overflow-hidden
      transition-all duration-200
      ${
        openRoleDropdown
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }
    `}
              >
                {predicted_roles.map((role, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedRole(role);
                      setOpenRoleDropdown(false);
                    }}
                    className="
          px-5 py-2.5
          text-sm font-medium
          text-[#3F7D20]
          cursor-pointer
          hover:bg-[#F4FBF6]
          transition-colors duration-150
        "
                  >
                    {role}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-4 py-1.5 rounded-full bg-[#91C499]/30 text-[#3F7D20] text-sm font-semibold">
              {selectedRole}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#4B6B57] font-medium">
              Resume Score
            </span>
            <div className="px-4 py-1.5 rounded-full bg-[#3F7D20] text-white font-bold text-sm shadow-md">
              {rating}/10
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#3F7D20]">
          Confirm & Refine Your Skills
        </h2>
        <p className="mt-2 text-sm text-[#4B6B57]">
          Review detected skills. Adjust before continuing.
        </p>

        {/* Rating Bar */}
        <div className="mt-6">
          <div className="h-3 rounded-full bg-[#91C499]/30 overflow-hidden">
            <div
              className="h-full bg-[#3F7D20] transition-all duration-500"
              style={{ width: `${Math.min(rating * 10, 100)}%` }}
            />
          </div>
        </div>

        <div className="my-8 h-px bg-[#91C499]/30" />

        {/* Add Skill */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="Add a new technical skill"
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#91C499]/60
            focus:outline-none focus:ring-1 focus:ring-[#3F7D20]"
          />

          <button
            onClick={handleAddSkill}
            className="px-6 py-2.5 rounded-xl bg-[#3F7D20] text-white font-semibold
            hover:shadow-lg hover:-translate-y-[1px] transition-all"
          >
            Add
          </button>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#3F7D20]">Skills</h3>
            <span className="text-sm text-[#4B6B57] font-medium">
              {editedSkills.length} total
            </span>
          </div>

          <div className="flex flex-wrap gap-3 max-h-56 overflow-y-auto pr-1">
            {editedSkills.map((skill, i) => (
              <div
                key={i}
                className="group flex items-center gap-2 px-4 py-2 rounded-full
                text-sm font-medium bg-[#F4FBF6]
                text-[#3F7D20] border border-[#91C499]/60"
              >
                {skill}
                <button
                  onClick={() => handleRemove(skill)}
                  className="text-[#3F7D20] font-bold
                  opacity-70 group-hover:opacity-100
                  hover:text-red-500 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="my-8 h-px bg-[#91C499]/30" />

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-xl font-semibold
            border-2 border-[#91C499]
            text-[#4B6B57]
            hover:bg-[#F4FBF6] transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="px-8 py-2.5 rounded-xl font-semibold
            bg-[#3F7D20] text-white
            hover:shadow-lg hover:-translate-y-[1px]
            transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
