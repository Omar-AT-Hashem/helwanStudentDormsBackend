import { Router } from "express";
import conn from "../../../config/db.js";

const bed = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const beds = await conn.awaitQuery("SELECT * FROM beds");
    return res.status(200).json(beds);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function create(req, res) {
  try {
    const { roomId, number } = req.body;

    if (!roomId || !number) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO beds (number, roomId, isOccupied) VALUES (?,?,?)",
      [number, roomId, 0]
    );

    res.status(201).json({ message: "Bed created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function update(req, res) {
  try {
    const { id, name, governorate } = req.body;

    if (!governorate || !name || !id) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    await conn.awaitQuery(
      "UPDATE categories SET name = ?, governorate = ? WHERE id = ?",
      [name, governorate, id]
    );

    res.status(201).json({ message: "instruction Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function occupy(req, res) {
  try {
    const { studentId, bedId } = req.body;

    if (!studentId || !bedId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    await conn.awaitQuery(
      "UPDATE beds SET isOccupied = ?, occupant = ? WHERE id = ?",
      [1, studentId, bedId]
    );

    await conn.awaitQuery("UPDATE students SET isHoused = ? WHERE id = ?", [
      1,
      studentId,
    ]);

    res.status(201).json({ message: "Student Housed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function unOccupy(req, res) {
  try {
    const { studentId, bedId } = req.body;

    if (!studentId || !bedId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    await conn.awaitQuery(
      "UPDATE beds SET isOccupied = ?, occupant = ? WHERE id = ?",
      [0, null, bedId]
    );

    await conn.awaitQuery("UPDATE students SET isHoused = ? WHERE id = ?", [
      0,
      studentId,
    ]);

    res.status(201).json({ message: "Student Housed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function deleteById(req, res) {
  const id = req.params.id;
  try {
    await conn.awaitQuery("DELETE FROM beds WHERE id = ?", [id]);
    return res.status(200).json({
      message: `bed with Id = ${id} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------

bed.get("/", index);
bed.post("/", create);
bed.post("/occupy", occupy);
bed.delete("/:id", deleteById);
bed.put("/", update);
bed.put("/unoccupy", unOccupy);

export default bed;
