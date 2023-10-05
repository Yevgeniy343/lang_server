import express from "express";
import { changePass } from "../controllers/juryControllers.js";

const router = express.Router();

router.route("/changepass").post(changePass);

export default router;
