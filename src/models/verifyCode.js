import mongoose from 'mongoose'

const verifyCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

export default mongoose.model("verify-codes", verifyCodeSchema)