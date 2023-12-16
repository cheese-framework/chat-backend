import { log } from "@drantaz/f-log";
import { Request, Response } from "express";
import Room from "../models/room";
import Chat from "../models/chat";
import { chrono } from "..";

export const createRoom = async (req: Request, res: Response) => {
  const { sender, receiver, createdBy, recipients } = req.body;
  try {
    const room = await Room.findOne({
      recipients: { $all: recipients },
    });
    if (!room) {
      const _room = await Room.create({
        sender,
        receiver,
        recipients,
        createdBy,
        lastMessage: "",
      });
      const toBeNotified = recipients.filter(
        (curr: string) => curr != createdBy
      );
      chrono.io.emit("room-created", { room: _room, toBeNotified });
      res.status(201).json(_room);
    } else {
      res.json({ ...room.toJSON(), exist: true });
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
      room: id,
    }).sort("-updatedAt");
    res.json(messages);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  const { recipients } = req.query;
  try {
    const rooms = await Room.find({ recipients }).sort("-updatedAt");
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
