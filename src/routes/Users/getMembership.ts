import express from "express";
import { verifyTokenAndAuthorization } from "../../authenticationToken";

import Membership from "../../controllers/membership/membership";

const router = express.Router();

// router.get("/membership/:id", Membership.getIndividualMembership);
router.get(
  "/membership",
  verifyTokenAndAuthorization,
  Membership.displayMyMembership
);

export { router as getMembership };
