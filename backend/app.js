import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();

// ---- __dirname FIX ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- MIDDLEWARES ----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- STATIC FILES ----
app.use(express.static(path.join(__dirname, "public")));

// ---- ROUTE ----
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ---- SERVER ----
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
