const express = require("express");
// const router = express.Router();
const router = express.Router({ mergeParams: true });
const documentController = require("../controllers/document.controller");
const achievementController = require("../controllers/achievements.controller");
const verifyToken = require("../middlewares/verifyToken");

// Document routes
router.post("/", verifyToken, documentController.createDocument);
router.get("/", verifyToken, documentController.getAllDocuments);
router.get("/:id", verifyToken, documentController.getDocument);
router.patch("/:id", verifyToken, documentController.updateDocument);
router.delete("/:id", verifyToken, documentController.deleteDocument);

// Achievement routes (nested)
router.post(
  "/:id/achievements",
  verifyToken,
  achievementController.addAchievement
);
router.patch(
  "/:id/achievements/:achId",
  verifyToken,
  achievementController.updateAchievement
);
router.delete(
  "/:id/achievements/:achId",
  verifyToken,
  achievementController.deleteAchievement
);

module.exports = router;
