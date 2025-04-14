const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const User = require("../models/user.model");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    }); // Return user info
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
});

module.exports = router;
