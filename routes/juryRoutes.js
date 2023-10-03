import express from "express";
import {
  signup,
  login,
  remind,
  changePass,
} from "../controllers/authJuryControllers.js";
import authenticateJury from "../middleware/authJury.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/remind").post(remind);
router.route("/changepass").post(changePass);

export default router;
