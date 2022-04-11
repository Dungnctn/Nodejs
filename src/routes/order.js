import express from "express";
import { createOrder, getAllOrder } from "../controllers/order";

const router = express.Router();

router.post("/order", createOrder);
router.get("/orders", getAllOrder);

export default router