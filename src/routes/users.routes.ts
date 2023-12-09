import express from "express";
import { allUsers, authenticate, createUser } from "../controllers/users";
const router = express.Router();

router.route("/").post(createUser).get(allUsers);
router.route("/authenticate").post(authenticate);

export default router;
