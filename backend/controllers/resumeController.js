import pdf from "@cyber2024/pdf-parse-fixed";
import mammoth from "mammoth";
import path from "path";

const evaluateExtractionQuality = (text) => {
    let score = 0;
    const charCount = text.length;
    const lines = text.split("\n");

    if (charCount < 300) score += 3;
    if (/\b([A-Za-z]\s){5,}[A-Za-z]\b/.test(text)) score += 2;

    const shortLines = lines.filter(l => l.trim().length < 5);
    if (shortLines.length / lines.length > 0.4) score += 2;

    const junkRatio =
        (text.match(/[�□■]/g)?.length || 0) / charCount;
    if (junkRatio > 0.02) score += 2;
    return { charCount, score, isLowQuality: score >= 4 };
}


// Function to extract sections from resume text


// function extractSections(text) {
//     const SECTION_ALIASES = {
//         skills: [
//             "skills", "technical skills", "key skills", "core skills",
//             "technologies", "tools & technologies", "competencies"
//         ],
//         experience: [
//             "experience", "work experience", "professional experience",
//             "employment history", "work history"
//         ],
//         projects: [
//             "projects", "personal projects", "academic projects",
//             "key projects", "major projects"
//         ],
//         education: [
//             "education", "academics", "qualifications"
//         ],
//         summary: [
//             "summary", "profile", "about", "about me"
//         ],
//         activities: [
//             "extra activities", "extracurricular", "activities", "volunteering"
//         ],
//         links: [
//             "links", "profiles","Profile Links", "portfolio", "github", "linkedin"
//         ]
//     };

//     const normalize = (s) =>
//         s.toLowerCase().replace(/[:\-]/g, "").replace(/\s+/g, " ").trim();

//     const lines = text.split("\n");
//     const result = {};
//     let currentSection = null;

//     for (const line of lines) {
//         const cleanLine = line.trim();
//         if (!cleanLine) continue;

//         const normalized = normalize(cleanLine);

//         let matchedSection = null;
//         for (const section in SECTION_ALIASES) {
//             if (SECTION_ALIASES[section].includes(normalized)) {
//                 matchedSection = section;
//                 break;
//             }
//         }

//         // Heading found
//         if (matchedSection) {
//             // Start capturing only for target sections
//             if (["skills", "experience", "projects"].includes(matchedSection)) {
//                 currentSection = matchedSection;
//                 result[currentSection] = [];
//             } else {
//                 // Stop capturing on any other section
//                 currentSection = null;
//             }
//             continue;
//         }

//         // Collect content
//         if (currentSection) {
//             result[currentSection].push(cleanLine);
//         }
//     }

//     // Convert arrays to text
//     for (const key in result) {
//         result[key] = result[key].join("\n");
//     }

//     return result;
// }


function extractSections(text) {
    const TARGET_SECTIONS = ["skills", "experience", "projects"];
    const SECTION_ALIASES = {
        skills: [
            "skills",
            "technical skills",
            "key skills",
            "core skills",
            "technologies",
            "tools and technologies",
            "competencies"
        ],
        experience: [
            "experience",
            "work experience",
            "professional experience",
            "employment history",
            "work history"
        ],
        projects: [
            "projects",
            "personal projects",
            "academic projects",
            "key projects",
            "major projects"
        ],
        education: [
            "education",
            "academics",
            "qualifications"
        ],
        activities: [
            "extra curricular",
            "extra curriculars",
            "extra-aurriculars & achievements",
            "extra curricular activities",
            "achievements",
            "activities",
            "volunteering"
        ],
        links: [
            "profile links",
            "links",
            "portfolio",
            "github",
            "linkedin"
        ],
        summary: [
            "summary",
            "profile",
            "about",
            "about me"
        ]
    };

    const normalize = (s) =>
        s.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim();

    const looksLikeHeading = (line) => {
        if (line.length > 40) return false;
        if (/\d/.test(line)) return false;
        if (line.split(" ").length > 6) return false;
        return true;
    };

    const lines = text.split("\n");
    const result = {};
    let currentSection = null;

    for (const line of lines) {
        const clean = line.trim();
        if (!clean) continue;

        const normalized = normalize(clean);

        // detect alias heading ONLY if line looks like a heading
        let detectedSection = null;
        if (looksLikeHeading(clean)) {
            for (const section in SECTION_ALIASES) {
                for (const alias of SECTION_ALIASES[section]) {
                    if (normalized === alias || normalized.startsWith(alias)) {
                        detectedSection = section;
                        break;
                    }
                }
                if (detectedSection) break;
            }
        }

        if (detectedSection) {
            if (TARGET_SECTIONS.includes(detectedSection)) {
                currentSection = detectedSection;
                if (!result[currentSection]) result[currentSection] = [];
            } else {
                currentSection = null;
            }
            continue;
        }

        if (currentSection) {
            result[currentSection].push(clean);
        }
    }

    for (const k in result) {
        result[k] = result[k].join("\n");
    }

    return result;
}


export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            });
        }

        const { originalname, mimetype, buffer, size } = req.file;
        const ext = path.extname(originalname).toLowerCase();

        let extractedText = "";

        // Extract text based on file type
        if (mimetype === "application/pdf") {
            const data = await pdf(buffer);
            extractedText = data.text;
        } else if (
            ext === ".docx" ||
            mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
        } else {
            return res.status(400).json({
                success: false,
                message: "Only PDF or DOCX files are supported",
            });
        }

        const cleanedText = extractedText
            .replace(/\r/g, "")
            .replace(/[ \t]+/g, " ")
            .replace(/\n{2,}/g, "\n")
            .replace(/^[\s•◦▪▫§|#–—·*\-]+/gm, "")
            .trim();

        const quality = evaluateExtractionQuality(cleanedText);

        if (quality.isLowQuality) {
            return res.status(422).json({
                success: false,
                message: "This resume appears to be designed using Canva or heavy graphics. Please upload a text-based PDF or DOCX for best results.",
            });
        }
        const sections = extractSections(cleanedText);
        console.log(sections);

        return res.status(201).json({
            success: true,
            message: "Resume uploaded and processed successfully",
            data: {
                fileName: originalname,
                fileSize: size,
                extractedText: cleanedText,
                meta: quality,
            },
        });

    } catch (error) {
        console.error("Resume upload error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to process resume",
        });
    }
};
