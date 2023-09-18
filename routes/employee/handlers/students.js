import { Router } from "express";

import { Student } from "../../../models/student.js";

import dotenv from "dotenv";

const students = Router();

async function index(req, res) {
  try {
    const students = await Student.findAll();
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function getStudentById(req, res) {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: "Please provide a studentId" });
  }

  try {
    const students = await Student.findOne({ where: { id: studentId } });
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

students.get("/", index);
students.post("/get-by-id", getStudentById);

export default students;
