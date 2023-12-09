import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    room: {
      id: String,
      name: String,
    },
    sender: {
      id: String,
      username: String,
    },
    receiver: {
      id: String,
      username: String,
    },
    message: String,
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chats", chatSchema);

export default Chat;
