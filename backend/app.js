import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import authRouter from './routes/authRouter.js'
import resumeRouter from "./routes/resumeRouter.js";
import userRouter from "./routes/userRouter.js";
import assessmentRouter from "./routes/assessmentRouter.js";
import { connectDB } from './config/mongoose.js';
connectDB();
import cookieParser from "cookie-parser";

const app = express();
// ---- __dirname FIX ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- MIDDLEWARES ----
app.use(cors({
    origin: "https://skill-qualifier-1.onrender.com",
    credentials: true, // allow cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- STATIC FILES ----
app.use(express.static(path.join(__dirname, "public")));

// ---- ROUTES ----
app.use("/auth", authRouter);
app.use("/upload", resumeRouter);
app.use("/user", userRouter);
app.use("/assessment", assessmentRouter);

//Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server running",
    });
});
const PORT = process.env.PORT || 3000;

// ---- SERVER ----
app.listen(PORT);
