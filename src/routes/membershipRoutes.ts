import {
  verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
} from "../authenticationToken";
import express from "express";
import Membership from "../controllers/membership/membership";
import { ExecException } from "child_process";
// import router from "./userRoutes";
const router = express.Router();
// const router = express.Router();

router.get("/memberships", Membership.displayMembership);
router.get("/memberships/:id", Membership.getIndividualMembership);
router.get("/memberships/count", Membership.countMembership);
router.post("/memberships", Membership.addMembership);
router.put("/memberships/:id", Membership.updateMembership);
router.put("/membershipss/:id", Membership.updateMembershipPackage);
router.patch("/memberships/:id", Membership.patchMembership);
router.delete("/memberships/:id", Membership.deleteMembership);
router.get("memberships/search", Membership.paginateMembership);
router.get("/findsum", Membership.findSum);
router.get("/checkdate", Membership.checkDate);
export default router;
