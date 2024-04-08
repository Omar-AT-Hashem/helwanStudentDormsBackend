import { Router } from "express";
import conn from "../../../config/db.js";

const studentfee = Router();

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
      "SELECT * FROM studentfees WHERE studentId = ? ",
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
    const { type, isPayed, sum, date, studentId } = req.body;

    if (!type || !date || !sum || !studentId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO studentfees (type, isPayed, sum, date, studentId) VALUES (?,?,?,?,?)",
      [type, isPayed, sum, date, studentId]
    );
    res
      .status(201)
      .json({ message: "studentfees created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function getStudentsFees(req, res) {
  try {
    const { fromDate, toDate, gender, faculty } = req.body;

    if (!fromDate || !toDate || !gender || !faculty) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const data = await conn.awaitQuery(
      "SELECT * FROM studentFees INNER JOIN students on students.id = studentfees.studentId WHERE faculty = ? AND gender = ? AND date BETWEEN ? AND ? ORDER BY studentId ASC, date ASC;",
      [faculty, gender, fromDate, toDate]
    );

    let augmentedData = [];

    let currentStudent = {
      ...data[0],
      fees: [],
    };

    data.forEach((student, index) => {
      if (
        student.studentId == currentStudent.studentId &&
        index != data.length - 1
      ) {
        currentStudent.fees.push({
          type: student.type,
          isPayed: student.isPayed,
          sum: student.sum,
          date: student.date,
        });
      } else {
        if (
          student.studentId == currentStudent.studentId &&
          index == data.length - 1
        ) {
          currentStudent.fees.push({
            type: student.type,
            isPayed: student.isPayed,
            sum: student.sum,
            date: student.date,
          });
          augmentedData.push(currentStudent);
          currentStudent = {
            ...student,
            fees: [],
          };
        } else {
          augmentedData.push(currentStudent);
          currentStudent = {
            ...student,
            fees: [],
          };
          currentStudent.fees.push({
            type: student.type,
            isPayed: student.isPayed,
            sum: student.sum,
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

studentfee.get("/", index);
studentfee.get("/get-by-studentId/:studentId", getByStudentId);
studentfee.post("/", create);
studentfee.post("/student-fees", getStudentsFees);

export default studentfee;
