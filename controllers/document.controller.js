const Document = require("../models/document.model");

exports.createDocument = async (req, res) => {
  try {
    const { title } = req.body;
    const document = await Document.create({ title, user: req.user.id });
    res.status(201).json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!document) return res.status(404).json({ error: "Not found" });
    res.json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!document) return res.status(404).json({ error: "Not found" });
    res.json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!document) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
