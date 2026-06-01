// config/mongoose.js
import mongoose from "mongoose";
export const connectDB = () => {
    const MONGO_URI = process.env.MONGO_URI;
    mongoose
        .connect(MONGO_URI)
        .then(() => {
        })

        .catch((err) => {
            console.log("mongodb not connected", err)
        });
};
