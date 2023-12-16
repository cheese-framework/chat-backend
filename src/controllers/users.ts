import { log } from "@drantaz/f-log";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptJs from "bcryptjs";
import User from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const pwd = bcryptJs.hashSync(password, 10);
    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password: pwd,
    });
    res.status(201).json(user);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const match = bcryptJs.compareSync(password, user.password);
      if (match) {
        const token = generateAccessToken({ email });
        res.json({ ...user.toJSON(), token });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

export const allUsers = async (req: Request, res: Response) => {
  const { except } = req.query;
  try {
    const users = await User.find({ _id: { $ne: except } }).sort("username");
    res.json(users);
  } catch ({ message }) {
    log(message, "error");
    res.status(500).json({ message });
  }
};

const generateAccessToken = (email: any, duration?: string) => {
  return jwt.sign(email, process.env.TOKEN_SECRET!, {
    expiresIn: duration ?? "7 days",
  });
};
