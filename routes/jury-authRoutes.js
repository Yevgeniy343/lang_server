import express from "express";
import { signup, login, remind } from "../controllers/authJuryControllers.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/remind").post(remind);

export default router;
