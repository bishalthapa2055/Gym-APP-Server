import express from "express";
import {
  decodeIDToken,
  verifyTokenAndAuthorization,
} from "../../authenticationToken";
import usersDetails from "../../controllers/userController";
import upload from "../../imagemodel/multer";
const router = express.Router();

router.get("/users", verifyTokenAndAuthorization, usersDetails.displayMe);
router.patch(
  "/users",
  verifyTokenAndAuthorization,
  upload,
  usersDetails.updateMyDetails
);
router.get("/login", verifyTokenAndAuthorization, usersDetails.login);

export { router as getUsers };