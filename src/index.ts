import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { log } from "@drantaz/f-log";
import ChronoSocket from "chrono-socket-hub";

// routes
import userRoutes from "./routes/users.routes";

const app = express();

export const chrono = new ChronoSocket({ app, logging: true });

const { server } = chrono;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

const init = () => {
  mongoose
    .connect("mongodb://localhost:27017/chat")
    .then(() => {
      server.listen(8080, () => {
        log(`Server listening on port 8080`, "http", false);
      });
    })
    .catch(({ message }) => log(message, "critical", false));
};

init();
