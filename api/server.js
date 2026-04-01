import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import GD from "../models/GD.js";
import SiteContent from "../models/SiteContent.js";
import Event from "../models/Event.js";
import Activity from "../models/Activity.js";
import TeamMember from "../models/TeamMember.js";
import Contributor from "../models/Contributor.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static uploaded files (Note: Vercel does not support persistent local storage)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// === Multer Setup for Image Uploads ===
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image provided" });
        }
        const imageUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
});

app.get("/api", (req, res) => {
    res.json({ message: "AI Club Hub API is running successfully on Vercel!" });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log("Connected to MongoDB Atlas"))
        .catch((err) => console.error("MongoDB connection error:", err));
}

// Admin Login
app.post("/api/admin/login", (req, res) => {
    try {
        const { username, password } = req.body;
        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin@123";

        if (username === adminUsername && password === adminPassword) {
            res.json({ message: "Login successful", username: adminUsername });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Generic CRUD Generator
const createCrudRoutes = (model, routeName) => {
    app.get(`/api/${routeName}`, async (req, res) => {
        try {
            const items = await model.find().sort({ createdAt: -1 });
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.post(`/api/${routeName}`, async (req, res) => {
        try {
            const newItem = new model(req.body);
            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.put(`/api/${routeName}/:id`, async (req, res) => {
        try {
            const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedItem) return res.status(404).json({ message: "Item not found" });
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.delete(`/api/${routeName}/:id`, async (req, res) => {
        try {
            const deletedItem = await model.findByIdAndDelete(req.params.id);
            if (!deletedItem) return res.status(404).json({ message: "Item not found" });
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
};

createCrudRoutes(SiteContent, "site-content");
createCrudRoutes(Event, "events");
createCrudRoutes(Activity, "activities");
createCrudRoutes(TeamMember, "team-members");
createCrudRoutes(Contributor, "contributors");
createCrudRoutes(GD, "gds");

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
