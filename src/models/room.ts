import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    sender: { id: String, name: String },
    receiver: { id: String, name: String },
    createdBy: String,
    lastMessage: String,
    recipients: Array<String>,
  },
  { timestamps: true }
);

const Room = mongoose.model("Rooms", roomSchema);

export default Room;
