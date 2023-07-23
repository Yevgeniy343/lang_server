import express from "express";
const router = express.Router();
import {
  createEvent,
  login,
  getEvents,
  editEvent,
  deleteEvent,
  getUsers,
} from "../controllers/adminControllers.js";
import fileUpload from "../middleware/file-upload.js";

router.route("/login").post(login);
router
  .route("/createevent")
  .post(fileUpload.fields([{ name: "file" }, { name: "image" }]), createEvent);

router.route("/getevents").get(getEvents);

router
  .route("/editevent")
  .patch(fileUpload.fields([{ name: "file" }, { name: "image" }]), editEvent);

router.route("/deleteevent/:id").delete(deleteEvent);

router.route("/getallusers").get(getUsers);

export default router;
