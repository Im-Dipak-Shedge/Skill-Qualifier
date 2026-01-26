import jwt from "jsonwebtoken";
import userModel from "../models/user.js"

export const requireAuth = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel
            .findById(decoded.id)
            .select("_id name email loginType avatar");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
