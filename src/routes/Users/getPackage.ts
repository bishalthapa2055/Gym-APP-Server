import express from "express";
import { verifyTokenAndAuthorization } from "../../authenticationToken";

import Packages from "../../controllers/packages/packages";
const router = express.Router();

// router.get("/package", verifyTokenAndAuthorization, Packages.displayPackages);
router.get("/package", verifyTokenAndAuthorization, Packages.getMyPackage);
router.patch("/package", verifyTokenAndAuthorization, Packages.updateMyPackage);
export { router as getPackage };
