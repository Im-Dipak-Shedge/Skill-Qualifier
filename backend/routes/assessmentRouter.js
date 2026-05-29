import express from "express";
const assessmentRouter = express.Router();

import { requireAuth } from "../middlewares/authMiddleware.js";
import { generateAssessment } from "../controllers/assessmentController.js";

assessmentRouter.post("/generate", requireAuth, generateAssessment);

export default assessmentRouter;
