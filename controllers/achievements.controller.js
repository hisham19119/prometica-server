const Document = require("../models/document.model");

exports.addAchievement = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!document) return res.status(404).json({ error: "Document not found" });
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }
    document.achievements.push(req.body);
    await document.save();
    res.status(201).json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const { id, achId } = req.params;
    const document = await Document.findOne({ _id: id, user: req.user.id });
    if (!document) return res.status(404).json({ error: "Document not found" });

    const achievement = document.achievements.id(achId);
    if (!achievement)
      return res.status(404).json({ error: "Achievement not found" });

    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }
    Object.assign(achievement, req.body);
    await document.save();
    res.json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const { id, achId } = req.params;
    const document = await Document.findOne({ _id: id, user: req.user.id });
    if (!document) return res.status(404).json({ error: "Document not found" });

    const achievement = document.achievements.id(achId);
    if (!achievement)
      return res.status(404).json({ error: "Achievement not found" });

    document.achievements.pull({ _id: achId });
    await document.save();
    res.json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
