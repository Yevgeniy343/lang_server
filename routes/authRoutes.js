import express from "express";
const router = express.Router();
import { signup, login, remind } from "../controllers/authControllers.js";

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/remind").post(remind);

export default router;
