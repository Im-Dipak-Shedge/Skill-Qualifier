// routes/userRoutes.js

import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { updateProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.put(
    "/profile-data",
    requireAuth,
    updateProfile
);

export default userRouter;