import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true }, 
    date: { type: String, required: true },
    time: { type: String },
    location: { type: String },
    speaker: { type: String },
    description: { type: String, required: true },
    registrationLink: { type: String },
    image: { type: String }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
