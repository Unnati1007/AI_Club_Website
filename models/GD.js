import mongoose from "mongoose";

const gdSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: 'https://via.placeholder.com/600x400/0D8ABC/FFFFFF?text=GD' },
    date: { type: String, required: true },
    link: { type: String }
}, {
    timestamps: true
});

export default mongoose.model("GD", gdSchema);
