import {
  verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
} from "../authenticationToken";
import Membership from "../controllers/membership/membership";
import router from "./userRoutes";

router.get("/memberships", Membership.displayMembership);
router.get("/memberships/:id", Membership.getIndividualMembership);
router.post("/memberships", Membership.addMembership);
router.put("/memberships/:id", Membership.updateMembership);
router.put("/membershipss/:id", Membership.updateMembershipPackage);
router.patch("/memberships/:id", Membership.patchMembership);
router.delete("/memberships/:id", Membership.deleteMembership);
export default router;
