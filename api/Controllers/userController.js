import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { userModel } from "../Models/userModel.js";
export const signupUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide credentials");
  }

  const userEmailAvailable = await userModel.findOne({ email });
  if (userEmailAvailable) {
    res.status(400);
    throw new Error("Email already in used");
  }

  const usernameAvailable = await userModel.findOne({ username });
  if (usernameAvailable) {
    res.status(400);
    throw new Error("Username is not available");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    username,
    id: user.id,
  });
});
