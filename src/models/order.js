import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            } 
        } 
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

const Order = mongoose.model("Order", orderSchema);
export default Order