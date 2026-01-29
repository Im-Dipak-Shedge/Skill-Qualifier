import express from 'express';
import upload from '../config/multer.js';
const resumeRouter = express.Router();
import { uploadResume } from '../controllers/resumeController.js';


resumeRouter.post('/', upload.single("resume"), uploadResume);
export default resumeRouter;