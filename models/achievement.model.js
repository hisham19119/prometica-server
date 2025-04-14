const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // accomplishment: {
    //   type: String,
    //   required: true,
    // },
    category: {
      type: String,
      required: true,
      enum: [
        "Project",
        "Skill",
        "Recognition",
        "Leadership",
        "Innovation",
        "Collaboration",
      ],
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    impact: {
      type: String,
    },
  },
  
  { timestamps: true }
);

module.exports = achievementSchema;
