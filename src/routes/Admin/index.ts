import express from "express";
import { getUsers } from "../Admin/getUsers";
import { getMembership } from "../Admin/getMembership";
import { getPackages } from "../Admin/getPackage";
import { getPayment } from "../Admin/getPayment";
const router = express.Router();

router.use(getUsers);
router.use(getMembership);
router.use(getPackages);
router.use(getPayment);

export { router as web };
