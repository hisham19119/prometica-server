const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, password, email, confirmPassword } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    password: hashedPassword,
    email,
    confirmPassword,
  });

  await newUser.save();

  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    // httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "Strict",
    httpOnly: true,
    secure: true, // Must be true in production
    sameSite: "none", // Required for cross-origin
    domain: ".vercel.app", // Match your domain
    maxAge: 86400000, // 1 day
  });

  res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    // httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "Strict",
    httpOnly: true,
    secure: true, // Must be true in production
    sameSite: "none", // Required for cross-origin
    domain: ".vercel.app", // Match your domain
    maxAge: 86400000, // 1 day
  });

  res.json({
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    },
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
