import express from "express";
import { createOrder, getAllOrder, getOrderDetail } from "../controllers/order";

const router = express.Router();

router.post("/order", createOrder);
router.get("/orders", getAllOrder);
router.get("/orderdetail/:id", getOrderDetail);

export default router