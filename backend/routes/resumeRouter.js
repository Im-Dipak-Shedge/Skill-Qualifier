import express from 'express';
import upload from '../config/multer.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
const resumeRouter = express.Router();
import { uploadResume } from '../controllers/resumeController.js';


resumeRouter.post('/', requireAuth, upload.single("resume"), uploadResume);
export default resumeRouter;