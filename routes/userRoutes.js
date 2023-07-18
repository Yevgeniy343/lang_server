import express from "express";
const router = express.Router();
import { editUser, getEvent } from "../controllers/userControllers.js";

router.route("/edit_user").post(editUser);
router.route("/get_event").get(getEvent);

export default router;
