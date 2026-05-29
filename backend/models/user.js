import mongoose from "mongoose";

// Define a sub-schema for skills
const skillSchema = new mongoose.Schema({
  name: String,
  rating: Number
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    googleId: { type: String, unique: true, sparse: true },
    avatar: String,
    loginType: {
      type: String,
      enum: ["local", "google"],
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    skills: [skillSchema],
    role: { type: String },

  },
  { timestamps: true }
);
const User =
  mongoose.models.User || mongoose.model("User", userSchema);
export default User;
