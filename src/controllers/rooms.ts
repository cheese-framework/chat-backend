import { log } from "@drantaz/f-log";
import { Request, Response } from "express";
import Room from "../models/room";
import Chat from "../models/chat";

export const createRoom = async (req: Request, res: Response) => {
  const { name, createdBy, recipients } = req.body;
  try {
    const room = await Room.findOne({ name, recipients: createdBy });
    if (!room) {
      res
        .status(201)
        .json(
          await Room.create({ name, recipients, createdBy, lastMessage: "" })
        );
    } else {
      res.json(room);
    }
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const messages = await Chat.find({
      room: { id },
    });
    res.json(messages);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  const { recipients } = req.query;
  try {
    const rooms = await Room.find({ recipients });
    res.json(rooms);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Chat.deleteMany({ room: { id } });
    await Room.findByIdAndDelete(id);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};
