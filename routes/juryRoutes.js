import express from "express";
import { changePass, getOrders } from "../controllers/juryControllers.js";

const router = express.Router();

router.route("/changepass").post(changePass);
router.route("/getOrders/:id").get(getOrders);

export default router;
