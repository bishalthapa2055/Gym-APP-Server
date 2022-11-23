import express from "express";
import { decodeIDToken } from "../authenticationToken";
import Tokens from "../controllers/Token/toke";

const router = express.Router();

router.get("/tokens", decodeIDToken, Tokens.getAll);
router.post("/tokens", decodeIDToken, Tokens.postData);

export default router;
