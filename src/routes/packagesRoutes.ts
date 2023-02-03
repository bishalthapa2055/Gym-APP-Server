import Packages from "../controllers/packages/packages";
import router from "./userRoutes";

router.get("/packages", Packages.displayPackages);
router.post("/packages", Packages.addPackages);
router.get("/packages/:id", Packages.getIndividualPackage);
router.patch("/packages/:id", Packages.updatePackages);
router.delete("/packages/:id", Packages.deletePackages);
router.get("/package/check", Packages.statusCheck);
router.patch("/updateStatus/:id", Packages.updateStatus);
// router.get("/searchpublished", Packages.searchPublishedPackage);
router.get("/published", Packages.searchPublishedPackage);
router.get("/searching", Packages.defaultSearch);
router.get("/searchPackage", Packages.searchPackages);
router.get("/count", Packages.CountPackages);
// router.get("/countActivePackages", Packages.countActivePackages);
export default router;
