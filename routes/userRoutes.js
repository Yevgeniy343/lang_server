import express from "express";
const router = express.Router();
import { editUser } from "../controllers/userControllers.js";

router.route("/edit_user").post(editUser);

export default router;
