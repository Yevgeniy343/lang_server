import express from "express";
import fileUpload from "../middleware/file-upload.js";

const router = express.Router();
import {
  editUser,
  getEvent,
  changePass,
  createChildOrder,
} from "../controllers/userControllers.js";

router.route("/edit_user").post(editUser);
router.route("/get_event").get(getEvent);
router.route("/changepass").post(changePass);
router
  .route("/createChildOrder")
  .post(
    fileUpload.fields([{ name: "file" }, { name: "file2" }]),
    createChildOrder
  );
router
  .route("/createAdultOrder")
  .post(
    fileUpload.fields([{ name: "file" }, { name: "file2" }]),
    createChildOrder
  );

export default router;
