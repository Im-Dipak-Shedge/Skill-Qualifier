import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    googleId: { type: String, unique: true, sparse: true },
    avatar: String,
    loginType: {
      type: String,
      enum: ["local", "google"],
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
