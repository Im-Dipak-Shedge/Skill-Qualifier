import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: {
            type: [String],
            required: true,
        },
        correctAnswer: {
            type: String,
            required: true,
        },
        marks: {
            type: Number,
            default: 1,
        },
    },
    { _id: false } // prevents creating _id for each sub-question
);

const questionSetSchema = new mongoose.Schema(
    {
        skill: {
            type: String,
            required: true,
            index: true,
        },

        type: {
            type: String,
            default: "mcq",
        },

        questions: {
            type: [questionSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// IMPORTANT: third parameter = exact collection name in MongoDB
export default mongoose.model(
    "Questionsets",
    questionSetSchema,
    "Questionsets"
);