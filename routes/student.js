const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const Homework = require("../models/homeworkModel");

// Create a new student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create({
      name: req.body.name,
      email: req.body.email,
      specialization: req.body.specialization,
      year: req.body.year,
    });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update one student
router.patch("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (req.body.email != null) student.email = req.body.email;
    if (req.body.name != null) student.name = req.body.name;
    if (req.body.specialization != null)
      student.specialization = req.body.specialization;
    if (req.body.year != null) student.year = req.body.year;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await student.destroy();
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Assign homework to student
router.post("/:id/homeworks", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    const homework = await Homework.findByPk(req.body.homeworkId);

    if (!student || !homework) {
      return res.status(404).json({ message: "Student or Homework not found" });
    }

    await student.addHomework(homework, {
      through: { grade: req.body.grade },
    });
    res.status(201).json({ message: "Homework assigned to student" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all homeworks assigned to a student
router.get("/:id/homeworks", async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { id: req.params.id },
      include: Homework,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student.Homework);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a homework assignment from a student
router.delete("/:studentId/homeworks/:homeworkId", async (req, res) => {
  try {
    const { studentId, homeworkId } = req.params;

    // Find the student by ID
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the homework by ID
    const homework = await Homework.findByPk(homeworkId);
    if (!homework) {
      return res.status(404).json({ message: "Homework not found" });
    }

    // Remove the homework from the student's assignments
    await student.removeHomework(homework);

    res.json({ message: "Homework assignment removed from student" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
