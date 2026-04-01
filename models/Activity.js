import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    iconType: { type: String, required: true },
    features: [{ type: String }],
    status: { type: String }
}, { timestamps: true });

export default mongoose.model("Activity", activitySchema);
