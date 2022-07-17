import mongoose, {Schema} from "mongoose";
const {ObjectId} = mongoose.Types

const productSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: ObjectId, 
        ref: "Category"
    },
    description: {
        type: String
    }
}, {timestamps: true})

productSchema.index({"$**": "text"})

export default mongoose.model("Product", productSchema);