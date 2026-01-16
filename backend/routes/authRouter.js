import express from "express";
import { googleLogin } from "../controllers/authController.js"
const authRouter = express.Router();

// sign in with google button
authRouter.post("/", googleLogin);


export default authRouter;
