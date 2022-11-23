import express from "express";
import { verifyTokenAndIsAdmin } from "../../authenticationToken";
import Payments from "../../controllers/payment/payments";

const router = express.Router();
router.get("/payments", verifyTokenAndIsAdmin, Payments.displayPayment);
router.post("/payments", verifyTokenAndIsAdmin, Payments.addPayment);
router.patch("/payments/:id", verifyTokenAndIsAdmin, Payments.patchPayments);
router.delete("/payments/:id", verifyTokenAndIsAdmin, Payments.deletePayment);
router.get(
  "/payments/:id",
  verifyTokenAndIsAdmin,
  Payments.getIndividualPayment
);

export { router as getPayment };
