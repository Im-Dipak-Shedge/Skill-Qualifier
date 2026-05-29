import Questionsets from "../models/questionsSets.js";

export const generateAssessment = async (req, res) => {
    try {
        const { skills, role } = req.body;


        // 1. fetch all matching skill documents
        const docs = await Questionsets.find({
            skill: { $in: skills },
        });
        console.log("fetched skills from db", docs);
        let finalQuestions = [];

        // 2. for each skill doc
        docs.forEach((doc) => {
            const shuffled = doc.questions.sort(
                () => Math.random() - 0.5
            );
            const selected = shuffled.slice(0, 4);
            const formatted = selected.map((q) => ({
                skill: doc.skill,
                type: doc.type,
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer, // keep if needed for backend
                marks: q.marks,
            }));

            finalQuestions.push(...formatted);
            console.log("selected questions for skill", finalQuestions);
        });

        // 3. response
        return res.status(200).json({
            success: true,
            role,
            totalQuestions: finalQuestions.length,
            questions: finalQuestions,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error generating assessment",
        });
    }
};