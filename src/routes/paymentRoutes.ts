import express from "express";
import Payments from "../controllers/payment/payments";
const router = express.Router();

router.get("/payments", Payments.displayPayment);
router.post("/payments", Payments.addPayment);
router.put("/payments/:id", Payments.updatePayments);
router.get("/payments/:id", Payments.getIndividualPayment);
router.patch("/payments/:id", Payments.patchPayments);
router.delete("/payments/:id", Payments.deletePayment);

export default router;
