import express from "express";
import { verifyTokenAndAuthorization } from "../../authenticationToken";
import Payments from "../../controllers/payment/payments";
const router = express.Router();

router.get("/payment", verifyTokenAndAuthorization, Payments.displayMyPayments);

export { router as getPayments };
