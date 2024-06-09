import express from "express"
import { addtocart, getCartDetails } from "../controllers/cart.js";

const router = express.Router();

router.post("/add",addtocart);
router.post("/details",getCartDetails);

export default router;