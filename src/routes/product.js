import { Router } from "express";
import { create, get, getAll, limit, remove, search, sort, update } from "../controllers/product";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";

const router = Router()

router.post("/product/:userId",requiredSignin, isAuth, isAdmin, create);
router.get("/products", getAll);
router.get("/search", search);
router.get("/limit", limit);
router.get("/sort", sort);
router.get("/product/:id", get);
router.delete("/product/:id/:userId",requiredSignin, isAuth, isAdmin, remove); 
router.put("/product/:id/:userId",requiredSignin, isAuth, isAdmin, update);

router.param("userId", userById);
export default router