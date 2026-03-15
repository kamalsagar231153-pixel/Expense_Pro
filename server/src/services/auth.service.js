import bcrypt from "bcrypt";
import {
  findUserByEmail,
  createUser
} from "../repositories/user.repository.js";
import Token from "../models/token.model.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/generateToken.js";

export const registerService = async (email, password) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    email,
    password: hashedPassword
  });

  return user;
};

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);

  console.log("User found:", user ? true : false);

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);

  console.log("Password match:", isMatch);

  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await Token.create({ user: user._id, refreshToken });

  return { accessToken, refreshToken };
};