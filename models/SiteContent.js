import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("SiteContent", siteContentSchema);
