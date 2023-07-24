import express from "express";
const router = express.Router();
import {
  editUser,
  getEvent,
  changePass,
} from "../controllers/userControllers.js";

router.route("/edit_user").post(editUser);
router.route("/get_event").get(getEvent);
router.route("/changepass").post(changePass);

export default router;
