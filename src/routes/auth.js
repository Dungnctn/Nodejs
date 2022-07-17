import { Router } from "express";
import { forgotPassword, resetPassword, signin, signup } from "../controllers/auth";
import { getAllUser, getUser, readUserOrder } from "../controllers/user";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgotPassword", forgotPassword)
router.post('/create-new-password?', resetPassword)
router.get("/listuser", getAllUser);
router.get("/user/:id", getUser);
router.get("/user/order/:id", readUserOrder);

export default router