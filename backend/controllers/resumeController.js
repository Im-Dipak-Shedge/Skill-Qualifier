import pdf from "@cyber2024/pdf-parse-fixed";
import mammoth from "mammoth";
import path from "path";

function evaluateExtractionQuality(text) {
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
            .trim();

        const quality = evaluateExtractionQuality(cleanedText);

        if (quality.isLowQuality) {
            return res.status(422).json({
                success: false,
                message: "This resume appears to be designed using Canva or heavy graphics. Please upload a text-based PDF or DOCX for best results.",
            });
        }

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
