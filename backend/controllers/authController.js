import { OAuth2Client } from "google-auth-library";
import userModel from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import emailVerificationTokenSchema from "../models/emailVerificationTokenSchema .js";


export const googleLogin = async (req, res) => {
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
                isVerified: true,
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

export const googleLogout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    res.status(200).json({ message: "Logged out" });
}

export const sendUserData = (req, res) => {
    res.json({
        user: {
            id: req.user.id,
            email: req.user.email,
        },
    });
}


//user registration with email and password
export const emailSignup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = await userModel.create({
            name: fullname,
            email,
            password: hashedPassword,
            loginType: "local",
            isVerified: false,
        });
        console.log("the user is saved");

        // Generate email verification token
        const emailVerificationToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
            .createHash("sha256")
            .update(emailVerificationToken)
            .digest("hex");
        await emailVerificationTokenSchema.create({
            userId: newUser._id,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        });

        const link = `http://localhost:5173/verify-email?token=${emailVerificationToken}`;
        sendVerificationEmail(email, link);
        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ message: "something went wrong while signing up", err });
    }
};

export const emailVerification = async (req, res) => {
    try {
        const { token } = req.body;
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const record = await emailVerificationTokenSchema.findOne({ token: hashedToken, expiresAt: { $gt: Date.now() } });
        if (!record) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        const user = await userModel.findById(record.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }
        user.isVerified = true;
        await user.save();
        await record.deleteOne();
        return res.status(200).json({
            message: "Email verified successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong while verifying email", err });
    }
}


export const emailSignin = async (req, res) => {
    // Implementation for email signin
};
