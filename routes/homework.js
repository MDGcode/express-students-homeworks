const express = require("express");
const router = express.Router();
const Homework = require("../models/homeworkModel");

// Create a new homework
router.post("/", async (req, res) => {
  try {
    const homework = await Homework.create({
      title: req.body.title,
      subject: req.body.subject,
      description: req.body.description,
    });
    res.status(201).json(homework);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all homeworks
router.get("/", async (req, res) => {
  try {
    const homeworks = await Homework.findAll();
    res.json(homeworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one homework
router.get("/:id", async (req, res) => {
  try {
    const homework = await Homework.findByPk(req.params.id);
    if (!homework)
      return res.status(404).json({ message: "Homework not found" });
    res.json(homework);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update one homework
router.patch("/:id", async (req, res) => {
  try {
    const homework = await Homework.findByPk(req.params.id);
    if (!homework)
      return res.status(404).json({ message: "Homework not found" });

    if (req.body.title != null) homework.title = req.body.title;
    if (req.body.subject != null) homework.subject = req.body.subject;
    if (req.body.description != null)
      homework.description = req.body.description;

    const updatedHomework = await homework.save();
    res.json(updatedHomework);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one homework
router.delete("/:id", async (req, res) => {
  try {
    const homework = await Homework.findByPk(req.params.id);
    if (!homework)
      return res.status(404).json({ message: "Homework not found" });

    await homework.destroy();
    res.json({ message: "Homework deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
