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
    namePerson: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
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
