import express from "express";
import { googleLogin } from "../controllers/authController.js"
const authRouter = express.Router();
import { requireAuth } from "../middlewares/authMiddleware.js";

//signin with google
authRouter.post("/google", googleLogin);
authRouter.get("/me", requireAuth, (req, res) => {
    res.json({
        user: {
            id: req.user.id,
            email: req.user.email,
        },
    });
});
authRouter.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.status(200).json({ message: "Logged out" });
});


export default authRouter;
