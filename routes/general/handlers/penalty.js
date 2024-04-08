import { Router } from "express";
import conn from "../../../config/db.js";

const penalty = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM penalties");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function getByStudentId(req, res) {
  try {
    const { studentId } = req.params;
    const penalties = await conn.awaitQuery(
      "SELECT * FROM penalties WHERE studentId = ? ",
      [studentId]
    );
    return res.status(200).json(penalties);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function create(req, res) {
  try {
    const { reason, date, studentId } = req.body;

    if (!reason || !date || !studentId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO penalties (reason, date, studentId) VALUES (?,?,?)",
      [reason, date, studentId]
    );

    res.status(201).json({ message: "Penalty created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}


async function getStudentsPenalties(req, res) {
  try {
    const { fromDate, toDate, gender, faculty } = req.body;

    if (!fromDate || !toDate || !gender || !faculty) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const data = await conn.awaitQuery(
      "SELECT * FROM penalties INNER JOIN students on students.id = penalties.studentId WHERE faculty = ? AND gender = ? AND date BETWEEN ? AND ? ORDER BY studentId ASC, date ASC;",
      [faculty, gender, fromDate, toDate]
    );

    let augmentedData = [];

    let currentStudent = {
      ...data[0],
      penalties: [],
    };

    data.forEach((student, index) => {
      if (
        student.studentId == currentStudent.studentId &&
        index != data.length - 1
      ) {
        currentStudent.penalties.push({
          reason: student.reason,
          date: student.date,
        });
      } else {
        if (
          student.studentId == currentStudent.studentId &&
          index == data.length - 1
        ) {
          currentStudent.penalties.push({
            reason: student.reason,
            date: student.date,
          });
          augmentedData.push(currentStudent);
          currentStudent = {
            ...student,
            penalties: [],
          };
        } else {
          augmentedData.push(currentStudent);
          currentStudent = {
            ...student,
            penalties: [],
          };
          currentStudent.penalties.push({
            reason: student.reason,
            date: student.date,
          });
        }
      }
    });

    res.status(201).json(augmentedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------
penalty.get("/", index);
penalty.get("/get-by-studentId/:studentId", getByStudentId);
penalty.post("/", create);
penalty.post("/student-penalties", getStudentsPenalties);
// penalty.delete("/:id", deleteById);
// penalty.put("/", update);

export default penalty;
