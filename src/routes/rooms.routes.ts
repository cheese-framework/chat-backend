import express from "express";
import {
  createRoom,
  deleteRoom,
  getMessages,
  getRooms,
} from "../controllers/rooms";
import auth from "../middlewares/auth";

const router = express.Router();

router.route("/").post(auth, createRoom).get(auth, getRooms);
router.route("/:id").delete(auth, deleteRoom).get(auth, getMessages);

export default router;
