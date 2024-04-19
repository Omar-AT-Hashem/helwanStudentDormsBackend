import { Router } from "express";
import conn from "../../../config/db.js";
import authenticateTokenLevelOne from "../../../middleware/authenticateTokenLevelOne.js";
import authenticateTokenLevelTwo from "../../../middleware/authenticateTokenLevelTwo.js";
import editHousingResourcesPerm from "../../../middleware/perms/editHousingResourcesPerm.js";

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
    const { type, number, floorId } = req.body;

    if (!number || !floorId || !type) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO rooms (number, type, floorId) VALUES (?,?,?)",
      [number, type, floorId]
    );

    res.status(201).json({ message: "room created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

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

room.get("/", authenticateTokenLevelOne, index);
room.post("/", authenticateTokenLevelTwo, editHousingResourcesPerm, create);
room.delete(
  "/:id",
  authenticateTokenLevelTwo,
  editHousingResourcesPerm,
  deleteById
);

export default room;
