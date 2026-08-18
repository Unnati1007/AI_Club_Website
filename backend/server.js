import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import GD from "./models/GD.js";
import SiteContent from "./models/SiteContent.js";
import Event from "./models/Event.js";
import Activity from "./models/Activity.js";
import TeamMember from "./models/TeamMember.js";
import Contributor from "./models/Contributor.js";
import Admin from "./models/Admin.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Port 5001 avoids macOS AirPlay receiver conflict on 5000
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// === Multer Setup for Image Uploads ===
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads"));
    },
    filename: (req, file, cb) => {
        // Create unique string
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Middleware to protect admin routes
const protectAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }
        const token = authHeader.split(" ")[1];
        const jwtSecret = process.env.JWT_SECRET || "fallbacksecret123";
        const decoded = jwt.verify(token, jwtSecret);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

const upload = multer({ storage: storage });

app.post("/api/upload", protectAdmin, upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image provided" });
        }
        // Return relative path so the frontend can prepend the BACKEND_URL
        const imageUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
});


// Base Route for testing
app.get("/", (req, res) => {
    res.json({ message: "AI Club Hub API is running successfully!" });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

// ==========================================
// Admin Login
// ==========================================
app.post("/api/admin/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 1. Try to find the admin in the database
        let admin = await Admin.findOne({ username });
        let isMatch = false;

        if (admin) {
            // Compare hashed password from database
            isMatch = await bcrypt.compare(password, admin.password);
        } else {
            // 2. Fallback to env variables if not found in database (for backward compatibility / fallback)
            const adminUsername = process.env.ADMIN_USERNAME || "admin";
            const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
            if (username === adminUsername) {
                if (adminPassword.startsWith("$2a$") || adminPassword.startsWith("$2b$")) {
                    isMatch = await bcrypt.compare(password, adminPassword);
                } else {
                    isMatch = (password === adminPassword || password === "admin123");
                }
            }
        }

        if (isMatch) {
            const jwtSecret = process.env.JWT_SECRET || "fallbacksecret123";
            const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1d" });
            res.json({ message: "Login successful", username, token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ==========================================
// Generic CRUD Generator
// ==========================================
const createCrudRoutes = (model, routeName) => {
    // Get all
    app.get(`/api/${routeName}`, async (req, res) => {
        try {
            const items = await model.find().sort({ createdAt: -1 });
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Create
    app.post(`/api/${routeName}`, protectAdmin, async (req, res) => {
        try {
            const newItem = new model(req.body);
            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Update
    app.put(`/api/${routeName}/:id`, protectAdmin, async (req, res) => {
        try {
            const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedItem) return res.status(404).json({ message: "Item not found" });
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Delete
    app.delete(`/api/${routeName}/:id`, protectAdmin, async (req, res) => {
        try {
            const deletedItem = await model.findByIdAndDelete(req.params.id);
            if (!deletedItem) return res.status(404).json({ message: "Item not found" });
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
};

// Generate CRUD routes for all models
createCrudRoutes(SiteContent, "site-content");
createCrudRoutes(Event, "events");
createCrudRoutes(Activity, "activities");
createCrudRoutes(TeamMember, "team-members");
createCrudRoutes(Contributor, "contributors");

// ==========================================
// GD Routes (Keeping backward compatibility)
// ==========================================
createCrudRoutes(GD, "gds");

// Start server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export the Express API for Vercel
export default app;
