import nodemailer from "nodemailer";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (email, link) => {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");
    await transporter.sendMail({
        from: `"Skill Qualifier" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your email",
        html:
            `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <button style="padding: 10px 20px; background-color: #4CAF50; 
      color: white; text-decoration: none; border-radius: 5px;">
      <a href="${link}">Verify Email</a>
      </button>
    `,
    });
};
