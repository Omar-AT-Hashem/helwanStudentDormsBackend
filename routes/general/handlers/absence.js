import { Router } from "express";
import conn from "../../../config/db.js";

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

    if (!fromDate || !reason || !toDate ||  !studentId) {
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

async function deleteById(req, res) {
  const id = req.params.id;
  try {
    await conn.awaitQuery("DELETE FROM absence WHERE id = ?", [id]);
    return res.status(200).json({
      message: `Blocked meal with Id = ${id} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------


absence.get("/", index);
absence.get("/get-by-studentId/:studentId", getByStudentId);
absence.post("/", create);
absence.delete("/:id", deleteById);

export default absence;
