import Order from "../models/order";

export const createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const orderDetail = await new Order(req.body).save();
        res.json(orderDetail)
    } catch (error) {
        res.json({
            message: "Dat hang khong thanh cong"
        })
    }
}
