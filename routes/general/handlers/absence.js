import { Router } from "express";
import conn from "../../../config/db.js";
import authenticateTokenLevelTwo from "../../../middleware/authenticateTokenLevelTwo.js";
import manageAbscencePerm from "../../../middleware/perms/manageAbscencePerm.js";

const absence = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM absence");
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
      "SELECT * FROM absence WHERE studentId = ? ",
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
    const { fromDate, toDate, reason, studentId } = req.body;

    if (!fromDate || !reason || !toDate || !studentId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO absence (fromDate, toDate, reason, studentId) VALUES (?,?,?,?)",
      [fromDate, toDate, reason, studentId]
    );

    res
      .status(201)
      .json({ message: "Blocked meal created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

// async function deleteById(req, res) {
//   const id = req.params.id;
//   try {
//     await conn.awaitQuery("DELETE FROM absence WHERE id = ?", [id]);
//     return res.status(200).json({
//       message: `Blocked meal with Id = ${id} was deleted successfully`,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// }
//----------------------------------------------------------------

async function getStudentsAbsence(req, res) {
  try {
    const { fromDate, toDate, gender, faculty } = req.body;

    if (!fromDate || !toDate || !gender || !faculty) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const data = await conn.awaitQuery(
      "SELECT * FROM absence INNER JOIN students on students.id = absence.studentId WHERE faculty = ? AND gender = ? AND fromDate BETWEEN ? AND ? ORDER BY studentId ASC, fromDate ASC;",
      [faculty, gender, fromDate, toDate]
    );

    let augmentedData = [];

    let currentStudent = {
      ...data[0],
      absence: [],
    };

    data.forEach((student, index) => {
      if (
        student.studentId == currentStudent.studentId &&
        index != data.length - 1
      ) {
        currentStudent.absence.push({
          reason: student.reason,
          fromDate: student.fromDate,
          toDate: student.toDate,
        });
      } else {
        if (
          student.studentId == currentStudent.studentId &&
          index == data.length - 1
        ) {
          currentStudent.absence.push({
            reason: student.reason,
            fromDate: student.fromDate,
            toDate: student.toDate,
          });
          augmentedData.push(currentStudent);
          currentStudent = {
            ...student,
            absence: [],
          };
        } else {
          augmentedData.push(currentStudent);
          currentStudent = {
            ...student,
            absence: [],
          };
          currentStudent.absence.push({
            reason: student.reason,
            fromDate: student.fromDate,
            toDate: student.toDate,
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

absence.get("/", authenticateTokenLevelTwo, index);
absence.get(
  "/get-by-studentId/:studentId",
  authenticateTokenLevelTwo,
  getByStudentId
);
absence.post("/", authenticateTokenLevelTwo, manageAbscencePerm, create);
// absence.delete(
//   "/:id",
//   authenticateTokenLevelTwo,
//   manageAbscencePerm,
//   deleteById
// );
absence.post("/student-absence", authenticateTokenLevelTwo, getStudentsAbsence);

export default absence;
