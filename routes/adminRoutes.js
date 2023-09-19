import express from "express";
const router = express.Router();
import {
  createEvent,
  login,
  getEvents,
  editEvent,
  deleteEvent,
  getUsers,
  createNom,
  getNom,
  deleteNom,
  getChildOrders,
  getAdultOrders,
  updateChildrenOrder,
  updateAdultOrder,
  updateStatusOrder,
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

router.route("/createnom").post(createNom);

router.route("/getnom").get(getNom);

router.route("/deletenom/:id").delete(deleteNom);

router.route("/getChildOrders").get(getChildOrders);
router.route("/getAdultOrders").get(getAdultOrders);

router.route("/editChildrenOrder").patch(updateChildrenOrder);
router.route("/editAdultOrder").patch(updateAdultOrder);

router.route("/editStatusOrder").patch(updateStatusOrder);

export default router;
