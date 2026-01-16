import express from "express";
import { googleLogin } from "../controllers/authController.js"
const authRouter = express.Router();


//signin with google
authRouter.post("/google", googleLogin);


export default authRouter;
