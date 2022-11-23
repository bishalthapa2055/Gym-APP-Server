import express from "express";
import { getUsers } from "./getUsers";
import { getMembership } from "./getMembership";
import { getPayments } from "./getPayments";
import { getPackage } from "./getPackage";
const router = express.Router();

router.use(getUsers);
router.use(getMembership);
router.use(getPayments);
router.use(getPackage);
export { router as Users };
