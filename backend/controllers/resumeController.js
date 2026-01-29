import pdf from "@cyber2024/pdf-parse-fixed";
import mammoth from "mammoth";
import path from "path";

export const uploadResume = async (req, res) => {
    try {
        // 1️⃣ Multer sanity check
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            });
        }

        const { originalname, mimetype, buffer, size } = req.file;
        const ext = path.extname(originalname).toLowerCase();

        let extractedText = "";

        // 2️⃣ Extract text based on file type
        if (mimetype === "application/pdf") {
            const data = await pdf(buffer); 
            extractedText = data.text; 
        }
        else if (
            mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
        }
        else if (mimetype === "application/msword") {
            return res.status(400).json({
                success: false,
                message: "DOC files are not supported yet. Upload PDF or DOCX.",
            });
        }

        // 3️⃣ Normalize text
        const cleanedText = extractedText
            .replace(/\s+/g, " ")
            .replace(/\n+/g, "\n")
            .trim();

        // 4️⃣ Basic quality check
        if (cleanedText.length < 300) {
            return res.status(422).json({
                success: false,
                message: "Resume text could not be extracted properly",
            });
        }


        console.log(cleanedText);

        // 5️⃣ (Later) Save resume + text to DB here
        // const resume = await Resume.create({ ... })

        // 6️⃣ Response (minimal, frontend-friendly)
        return res.status(201).json({
            success: true,
            message: "Resume uploaded and text extracted successfully",
            data: {
                fileName: originalname,
                fileSize: size,
                charCount: cleanedText.length,
                // resumeId: resume._id (later)
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
