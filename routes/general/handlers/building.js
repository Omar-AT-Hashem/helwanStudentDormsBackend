import { Router } from "express";
import conn from "../../../config/db.js";
import authenticateTokenLevelOne from "../../../middleware/authenticateTokenLevelOne.js";
import authenticateTokenLevelTwo from "../../../middleware/authenticateTokenLevelTwo.js";
import editHousingResourcesPerm from "../../../middleware/perms/editHousingResourcesPerm.js";

const building = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM buildings");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function create(req, res) {
  try {
    const { name, type, townId } = req.body;

    if (!name || !type || !townId) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO buildings (name, type, townId) VALUES (?,?,?)",
      [name, type, townId]
    );

    res.status(201).json({ message: "Building created", id: created.insertId });
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

//----------------------------------------------------------------

async function deleteById(req, res) {
  const id = req.params.id;
  try {
    await conn.awaitQuery("DELETE FROM buildings WHERE id = ?", [id]);
    return res.status(200).json({
      message: `building with Id = ${id} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------

building.get("/", authenticateTokenLevelOne, index);
building.post("/", authenticateTokenLevelTwo, editHousingResourcesPerm, create);
building.delete(
  "/:id",
  authenticateTokenLevelTwo,
  editHousingResourcesPerm,
  deleteById
);
// building.put("/", update);

export default building;
