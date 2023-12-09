import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

export default User;
