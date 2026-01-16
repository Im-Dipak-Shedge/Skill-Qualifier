import { OAuth2Client } from "google-auth-library";
import userModel from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    const useNavigate = useNavigate();
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ message: "No credential provided" });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const {
            sub,
            email,
            email_verified,
            name,
            picture,
        } = ticket.getPayload();

        if (!email_verified) {
            return res.status(403).json({ message: "Email not verified" });
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                name,
                email,
                googleId: sub,
                avatar: picture,
                loginType: "google",
            });
        }
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 5 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Google login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });


    } catch (err) {
        console.error("Google verification failed:", err);
        res.status(401).json({ message: "Invalid Google token" });
    }
};
