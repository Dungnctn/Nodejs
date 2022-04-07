import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    }
}, {timestamps: true})

export default mongoose.model("Category", categorySchema)