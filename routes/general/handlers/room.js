import { Router } from "express";
import conn from "../../../config/db.js";

const room = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM categories");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function create(req, res) {
  try {
    const { number, floorId } = req.body;

    if (!number || !floorId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO rooms (number, floorId) VALUES (?,?)",
      [number, floorId]
    );

    res.status(201).json({ message: "room created", id: created.insertId });
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

async function deleteById(req, res) {
  const id = req.params.id;
  try {
    await conn.awaitQuery("DELETE FROM rooms WHERE id = ?", [id]);
    return res.status(200).json({
      message: `room with Id = ${id} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------

room.get("/", index);
room.post("/", create);
room.delete("/:id", deleteById);
room.put("/", update);

export default room;
