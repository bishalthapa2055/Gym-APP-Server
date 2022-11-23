import Packages from "../controllers/packages/packages";
import router from "./userRoutes";

router.get("/packages", Packages.displayPackages);
router.post("/packages", Packages.addPackages);
router.get("/packages/:id", Packages.getIndividualPackage);
router.put("/packages/:id", Packages.updatePackages);
router.delete("/packages/:id", Packages.deletePackages);
export default router;
