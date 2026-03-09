import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import GD from "./models/GD.js";
import Admin from "./models/Admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes

// Get all GDs
app.get("/api/gds", async (req, res) => {
    try {
        const gds = await GD.find().sort({ date: -1 }); // Sort by newest
        res.json(gds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed default GDs (helper route)
app.post("/api/gds/seed", async (req, res) => {
    try {
        const count = await GD.countDocuments();
        if (count > 0) return res.json({ message: "Database already seeded" });

        const DEFAULT_GDS = [
            {
                title: 'AI Ethics & Bias',
                description: 'Explored the ethical implications of AI systems and how bias can creep into machine learning models. Discussed real-world examples and mitigation strategies.',
                image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop',
                date: '2025-10-15',
                link: 'https://example.com/ai-ethics'
            },
            {
                title: 'Future of LLMs',
                description: 'Deep dive into Large Language Models, their architecture evolution, and what the future holds for generative AI in production systems.',
                image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
                date: '2025-10-22'
            },
            {
                title: 'Computer Vision Workshop',
                description: 'Hands-on session covering image classification, object detection, and the latest advances in vision transformers.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
                date: '2025-11-01'
            }
        ];

        await GD.insertMany(DEFAULT_GDS);
        res.json({ message: "Seeded successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new GD
app.post("/api/gds", async (req, res) => {
    try {
        const newGD = new GD(req.body);
        const savedGD = await newGD.save();
        res.status(201).json(savedGD);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a GD
app.put("/api/gds/:id", async (req, res) => {
    try {
        const updatedGD = await GD.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGD) return res.status(404).json({ message: "GD not found" });
        res.json(updatedGD);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a GD
app.delete("/api/gds/:id", async (req, res) => {
    try {
        const deletedGD = await GD.findByIdAndDelete(req.params.id);
        if (!deletedGD) return res.status(404).json({ message: "GD not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Login
app.post("/api/admin/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login successful", username: admin.username });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Admin Helper
app.post("/api/admin/seed", async (req, res) => {
    try {
        const count = await Admin.countDocuments();
        if (count > 0) return res.json({ message: "Admin already exists" });

        const defaultAdmin = new Admin({
            username: "admin",
            password: "password123" // Note: plain text for simplicity per request, but should be hashed in prod
        });

        await defaultAdmin.save();
        res.json({ message: "Admin seeded successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
