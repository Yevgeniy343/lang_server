import express from "express";
const router = express.Router();
import { createEvent, login } from "../controllers/adminControllers.js";
import fileUpload from "../middleware/file-upload.js";

router.route("/login").post(login);
router
  .route("/createevent")
  .post(fileUpload.fields([{ name: "file" }, { name: "image" }]), createEvent);

export default router;
