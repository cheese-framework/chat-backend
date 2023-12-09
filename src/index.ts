import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ChronoSocket from "chrono-socket-hub";
import mongoose from "mongoose";
import cors from "cors";
import { log } from "@drantaz/f-log";

// routes
import userRoutes from "./routes/users.routes";
import roomRoutes from "./routes/rooms.routes";

import handleSocketConnections from "./lib/chat";

const app = express();

export const chrono = new ChronoSocket({ app, logging: false });

const { server } = chrono;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

const init = () => {
  mongoose
    .connect("mongodb://localhost:27017/chat")
    .then(() => {
      server.listen(8080, () => {
        log(`Server listening on port 8080`, "http", false);
        handleSocketConnections();
      });
    })
    .catch(({ message }) => log(message, "critical", false));
};

init();
