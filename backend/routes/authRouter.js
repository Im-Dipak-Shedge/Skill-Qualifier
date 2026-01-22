import express from "express";
import { googleLogin, googleLogout, sendUserData, emailSignin, emailSignup } from "../controllers/authController.js"
const authRouter = express.Router();
import { requireAuth } from "../middlewares/authMiddleware.js";

//signin with google
authRouter.post("/google", googleLogin);
authRouter.get("/me", requireAuth, sendUserData);
authRouter.post("/logout", googleLogout)
authRouter.post("/signup", emailSignup);
authRouter.post("/signin", emailSignin);

export default authRouter;
