import express from "express";
import {
  changePass,
  getOrders,
  editProfile,
  check,
} from "../controllers/juryControllers.js";

const router = express.Router();

router.route("/changepass").post(changePass);
router.route("/getOrders/:id").get(getOrders);
router.route("/editProfile").post(editProfile);
router.route("/check").patch(check);

export default router;
