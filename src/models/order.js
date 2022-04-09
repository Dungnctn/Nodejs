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
            quantity: {type: Number, required: true},
            image: {type: String, required: true},
            price: { type: Number, required: true },
            _id: {
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
    info: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
    },
    shipAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    notes: {
        type: String,
        default: null
    }
})

export default mongoose.model("Order", orderSchema);
