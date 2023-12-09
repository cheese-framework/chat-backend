import { chrono } from "..";
import Chat from "../models/chat";
import Room from "../models/room";

const handleSocketConnections = () => {
  chrono.onSubscribe((client, room) => {
    console.log(client, "has joined channel", room);
  });

  chrono.onMessage(async (client, data) => {
    const { message, sender, receiver, room } = data;
    const chat = await Chat.create({ message, sender, receiver, room });
    chrono.sendMessage(client, "message", chat.toJSON(), false, room);
    await Room.findByIdAndUpdate(room, { lastMessage: message });
  });
};

export default handleSocketConnections;
