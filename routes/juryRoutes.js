import express from "express";
import {
  changePass,
  getOrders,
  editProfile,
} from "../controllers/juryControllers.js";

const router = express.Router();

router.route("/changepass").post(changePass);
router.route("/getOrders/:id").get(getOrders);
router.route("/editProfile").post(editProfile);

export default router;
