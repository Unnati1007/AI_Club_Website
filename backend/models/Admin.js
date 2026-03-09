import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } // In a real app, this should be hashed
}, {
    timestamps: true
});

export default mongoose.model("Admin", adminSchema);
