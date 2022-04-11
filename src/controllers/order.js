import Order from "../models/order";
import User from "../models/user";

export const createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const orderDetail = await new Order(req.body).save();
        res.json( orderDetail )
    } catch (error) {
        res.json({
            message: "Dat hang khong thanh cong"
        })
    }
}

export const getAllOrder = async (req, res) => {
    try {
        const order = await Order.find().exec();
        res.json(order)
    } catch (error) {
        res.status(400).json({
            message: "Khong co order"
        })
    }
}