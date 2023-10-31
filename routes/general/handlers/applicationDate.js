import { Router } from "express";
import conn from "../../../config/db.js";

const applicationDate = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM applicationdates");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//test

//----------------------------------------------------------------

async function create(req, res) {
  try {
    const { startDate, endDate, studentType } = req.body;

    if (!startDate || !endDate || !studentType) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO applicationdates (startDate, endDate, studentType) VALUES (?,?,?)",
      [startDate, endDate, studentType]
    );

    res
      .status(201)
      .json({ message: "Application Date created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function update(req, res) {
  try {
    const { id, studentType, startDate, endDate } = req.body;

    if (!studentType || !startDate || !endDate || !id) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    await conn.awaitQuery(
      "UPDATE applicationdates SET studentType = ?, startDate = ?, endDate = ? WHERE id = ?",
      [studentType, startDate, endDate, id]
    );

    res.status(201).json({ message: "instruction Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function deleteById(req, res) {
  const dateId = req.params.id;
  try {
    await conn.awaitQuery("DELETE FROM applicationdates WHERE id = ?", [
      dateId,
    ]);
    return res.status(200).json({
      message: `date with Id = ${instructionId} was deleted successfully`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

applicationDate.get("/", index);
applicationDate.post("/", create);
applicationDate.delete("/:id", deleteById);
applicationDate.put("/", update);

export default applicationDate;
