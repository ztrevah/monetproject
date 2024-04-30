import express from "express"
import { register_step1, register_step2, register_step3, login, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/signups1",register_step1);
router.post("/signups2",register_step2);
router.post("/signups3",register_step3);

router.post("/login",login);

router.post("/logout",logout)

export default router