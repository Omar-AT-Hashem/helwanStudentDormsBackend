import { Router } from "express";
import conn from "../../../config/db.js";
import authenticateToken from "../../../middleware/authenticateToken.js";

import dotenv from "dotenv";

const students = Router();

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM students");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function getStudentById(req, res) {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: "Please provide a studentId" });
  }

  try {
    const student = await conn.awaitQuery(
      "SELECT * FROM students WHERE id = ? ",
      [studentId]
    );
    return res.status(200).json(student[0]);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

students.get("/", authenticateToken, index);
students.get("/get-by-id/:studentId", authenticateToken, getStudentById);

export default students;
