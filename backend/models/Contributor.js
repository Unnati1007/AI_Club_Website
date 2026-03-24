import mongoose from "mongoose";

const contributorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    contributions: { type: Number, required: true, default: 0 },
    projects: [{ type: String }],
    github: { type: String },
    linkedin: { type: String },
    rank: { type: Number }
}, { timestamps: true });

export default mongoose.model("Contributor", contributorSchema);
