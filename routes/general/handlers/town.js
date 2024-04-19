import { Router } from "express";
import conn from "../../../config/db.js";
import authenticateTokenLevelOne from "../../../middleware/authenticateTokenLevelOne.js";
import authenticateTokenLevelTwo from "../../../middleware/authenticateTokenLevelTwo.js";
import editHousingResourcesPerm from "../../../middleware/perms/editHousingResourcesPerm.js";

const town = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM towns");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function create(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO towns (name) VALUES (?)",
      [name]
    );

    res.status(201).json({ message: "Town created", id: created.insertId });
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
    await conn.awaitQuery("DELETE FROM towns WHERE id = ?", [id]);
    return res.status(200).json({
      message: `Town with Id = ${id} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------

town.get("/", authenticateTokenLevelOne, index);
town.post("/",authenticateTokenLevelTwo,editHousingResourcesPerm, create);
town.delete("/:id",authenticateTokenLevelTwo,editHousingResourcesPerm, deleteById);


export default town;
