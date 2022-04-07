import { Router } from "express";
import { create, get, getAll, readProduct, remove, update } from "../controllers/category";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";

const router = Router()

router.post("/category/:userId",requiredSignin, isAuth, isAdmin, create);
router.get("/categories", getAll);
router.get("/category/product/:id", readProduct);
router.get("/category/:id", get);
router.delete("/category/:id/:userId",requiredSignin, isAuth, isAdmin, remove);
router.put("/category/:id/:userId",requiredSignin, isAuth, isAdmin, update);

router.param("userId", userById)

export default router