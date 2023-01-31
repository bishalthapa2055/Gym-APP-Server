import express from "express";
import { verifyTokenAndIsAdmin } from "../../authenticationToken";
import Membership from "../../controllers/membership/membership";

const router = express.Router();

router.get("/membership", verifyTokenAndIsAdmin, Membership.displayMembership);
router.get(
  "/membership/count",
  verifyTokenAndIsAdmin,
  Membership.countMembership
);
router.post("/membership", verifyTokenAndIsAdmin, Membership.addMembership);
router.delete(
  "/membership/:id",
  verifyTokenAndIsAdmin,
  Membership.deleteMembership
);

router.get(
  "/membership/:id",
  verifyTokenAndIsAdmin,
  Membership.getIndividualMembership
);
router.get(
  "/memberships/checkdates",
  verifyTokenAndIsAdmin,
  Membership.checkDate
);
router.get("/memberships/findsum", verifyTokenAndIsAdmin, Membership.findSum);
router.patch(
  "/membership/:id",
  verifyTokenAndIsAdmin,
  Membership.patchMembership
);
export { router as getMembership };
