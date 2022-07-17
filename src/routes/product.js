import { Router } from "express";
import { create, get, getAll, remove, update } from "../controllers/product";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
import { checkPermissions, requireLogin } from "../middlewares/permission";

const router = Router()

// router.post("/product/:userId",requiredSignin, isAuth, isAdmin, create);
router.post("/product",requireLogin,checkPermissions(1), create);
router.get("/products",requireLogin,checkPermissions(0), getAll);
router.get("/product/:id",requireLogin, get);
// router.delete("/product/:id/:userId",requiredSignin, isAuth, isAdmin, remove); 
// router.put("/product/:id/:userId",requiredSignin, isAuth, isAdmin, update);
router.delete("/product/:id",requireLogin,checkPermissions(1), remove); 
router.put("/product/:id",requireLogin,checkPermissions(1), update);

router.param("userId", userById);
export default router