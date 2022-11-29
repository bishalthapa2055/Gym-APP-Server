import express from "express";
import userController from "../controllers/userController";

import {
  decodeIDToken,
  verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
} from "../authenticationToken";

import upload from "../imagemodel/multer";
const router = express.Router();

router.get(
  "/displays",

  // verifyTokenAndIsAdmin,

  userController.displayUsers
);
router.get(
  "/displays/:id",
  // verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
  userController.getIndividualUsers
);

router.get(
  "/display/me",
  verifyTokenAndAuthorization,
  userController.displayMe
);

router.post(
  "/create",
  upload,
  // verifyTokenAndIsAdmin,
  userController.createUsers
);

router.get("/users/count", userController.countUser);
router.delete("/delete/:id", verifyTokenAndIsAdmin, userController.deleteUsers);
router.patch("/update/:id", upload, userController.updateUsers);
router.get("/lookup", userController.aggregrate);

export default router;
