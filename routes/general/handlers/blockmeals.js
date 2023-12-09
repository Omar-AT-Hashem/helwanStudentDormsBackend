import { Router } from "express";
import conn from "../../../config/db.js";

const blockmeals = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM blockmeals");
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
      "SELECT * FROM blockmeals WHERE studentId = ? ",
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
    const { fromDate, toDate, meal, reason, studentId } = req.body;

    if (!fromDate || !reason || !toDate || !meal || !studentId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO blockmeals (fromDate, toDate, meal, reason, studentId) VALUES (?,?,?,?,?)",
      [fromDate, toDate, meal, reason, studentId]
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
    await conn.awaitQuery("DELETE FROM blockmeals WHERE id = ?", [id]);
    return res.status(200).json({
      message: `Blocked meal with Id = ${id} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------


blockmeals.get("/", index);
blockmeals.get("/get-by-studentId/:studentId", getByStudentId);
blockmeals.post("/", create);
blockmeals.delete("/:id", deleteById);

export default blockmeals;
