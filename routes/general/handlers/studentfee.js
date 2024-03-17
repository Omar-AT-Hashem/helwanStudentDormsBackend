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

// async function update(req, res) {
//   try {
//     const { id, name, governorate } = req.body;

//     if (!governorate || !name || !id) {
//       return res
//         .status(400)
//         .json({ message: "Please provide all the required fields" });
//     }

//     await conn.awaitQuery(
//       "UPDATE categories SET name = ?, governorate = ? WHERE id = ?",
//       [name, governorate, id]
//     );

//     res.status(201).json({ message: "instruction Updated" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// }

// //----------------------------------------------------------------

// async function deleteById(req, res) {
//   const id = req.params.id;
//   try {
//     await conn.awaitQuery("DELETE FROM categories WHERE id = ?", [id]);
//     return res.status(200).json({
//       message: `date with Id = ${instructionId} was deleted successfully`,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// }
// //----------------------------------------------------------------

studentfee.get("/", index);
studentfee.get("/get-by-studentId/:studentId", getByStudentId);
studentfee.post("/", create);
// studentfees.delete("/:id", deleteById);
// studentfees.put("/", update);

export default studentfee;

