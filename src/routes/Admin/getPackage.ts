import express from "express";
import { verifyTokenAndIsAdmin } from "../../authenticationToken";
import Packages from "../../controllers/packages/packages";

const router = express.Router();

router.get("/packages", verifyTokenAndIsAdmin, Packages.displayPackages);
router.get("/packages/count", verifyTokenAndIsAdmin, Packages.CountPackages);
router.get(
  "/packages/countactivepackages",
  verifyTokenAndIsAdmin,
  Packages.countActivePackages
);
router.post("/packages", verifyTokenAndIsAdmin, Packages.addPackages);
router.delete("/packages/:id", verifyTokenAndIsAdmin, Packages.deletePackages);
router.get(
  "/packages/:id",
  verifyTokenAndIsAdmin,
  Packages.getIndividualPackage
);
router.patch("/packages/:id", verifyTokenAndIsAdmin, Packages.updatePackages);
export { router as getPackages };
