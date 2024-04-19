import { Router } from "express";
import conn from "../../../config/db.js";
import editFeesPerm from "../../../middleware/perms/editFeesPerm.js";
import authenticateTokenLevelTwo from "../../../middleware/authenticateTokenLevelTwo.js";
import editHousingResourcesPerm from "../../../middleware/perms/editHousingResourcesPerm.js";
import authenticateTokenLevelOne from "../../../middleware/authenticateTokenLevelOne.js";

const floor = Router();

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
    const { number, buildingId } = req.body;

    if (!number || !buildingId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO floors (number, buildingId) VALUES (?,?)",
      [number, buildingId]
    );

    res.status(201).json({ message: "floor created", id: created.insertId });
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
    await conn.awaitQuery("DELETE FROM floors WHERE id = ?", [id]);
    return res.status(200).json({
      message: `floor with Id = ${id} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------

floor.get("/", authenticateTokenLevelOne, index);
floor.post("/", authenticateTokenLevelTwo, editHousingResourcesPerm, create);
floor.delete("/:id", authenticateTokenLevelTwo, editFeesPerm, deleteById);

export default floor;
