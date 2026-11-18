import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Name, email and password are required" });
  }
if (password.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: "Password must be at least 6 characters" });
  }

  const normalizedEmail = email.toLowerCase();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) {
    return res
      .status(409)
      .json({ success: false, message: "This email is already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email: normalizedEmail, passwordHash });

  res.status(201).json({
    success: true,
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  const isMatch = user && (await bcrypt.compare(password, user.passwordHash));

  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  res.json({
    success: true,
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};
export const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};