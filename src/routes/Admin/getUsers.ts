import express from "express";
import { verifyTokenAndIsAdmin } from "../../authenticationToken";

import Users from "../../controllers/userController";

const router = express.Router();

router.get("/users", verifyTokenAndIsAdmin, Users.displayUsers);
router.get("/isAdmin", verifyTokenAndIsAdmin, Users.admin);
router.post("/login", verifyTokenAndIsAdmin, Users.login);
// router.get("/users", Users.displayUsers);
router.get("/users/count", verifyTokenAndIsAdmin, Users.countUser);
router.post("/users", verifyTokenAndIsAdmin, Users.createUsers);
router.delete("/users/:id", verifyTokenAndIsAdmin, Users.deleteUsers);
router.get("/users/:id", verifyTokenAndIsAdmin, Users.getIndividualUsers);
router.patch("/users/:id", verifyTokenAndIsAdmin, Users.updateUsers);


export { router as getUsers };
