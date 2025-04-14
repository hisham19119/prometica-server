const mongoose = require("mongoose");
const achievementSchema = require("./achievement.model");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    achievements: [achievementSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
