import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    hierarchyLevel: { type: String, required: true }, 
    image: { type: String, required: true },
    subRole: { type: String }
}, { timestamps: true });

export default mongoose.model("TeamMember", teamMemberSchema);
