import express from "express";
import { googleLogin, googleLogout, sendUserData, emailSignin, emailSignup } from "../controllers/authController.js"
const authRouter = express.Router();
import { requireAuth } from "../middlewares/authMiddleware.js";
import { emailVerification } from "../controllers/authController.js"
//signin with google
authRouter.post("/google", googleLogin);
authRouter.get("/me", requireAuth, sendUserData);
authRouter.post("/logout", googleLogout)
authRouter.post("/signup", emailSignup);
authRouter.post("/signin", emailSignin);
authRouter.post("/verify-email", emailVerification)
export default authRouter;
