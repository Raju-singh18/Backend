
import express from "express";
import { createOrder, VerifyPayment } from "../controllers/createOrder.js";
const router = express.Router();

router.post("/create-order",createOrder);
router.post("/verify-payment",VerifyPayment);

export default router;
