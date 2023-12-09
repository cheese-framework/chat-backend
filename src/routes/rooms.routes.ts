import express from "express";
import { createRoom, deleteRoom, getRooms } from "../controllers/rooms";
import auth from "../middlewares/auth";

const router = express.Router();

router.route("/").post(auth, createRoom).get(auth, getRooms);
router.route("/:id").delete(auth, deleteRoom);

export default router;
