import mongoose, {Schema} from "mongoose";

const { ObjectId } = mongoose.Types

const orderSchema = new Schema({
    users: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            product: {
                type: ObjectId,
                required: true,
                ref: "Product"
            } 
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shipAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    }
})

export default mongoose.model("Order", orderSchema);
