import { Router } from "express";
import conn from "../../../config/db.js";

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
    const { name, governorate } = req.body;

    if (!name || !governorate) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO categories (name, governorate) VALUES (?,?)",
      [name, governorate]
    );

    res.status(201).json({ message: "Catagory created", id: created.insertId });
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
    await conn.awaitQuery("DELETE FROM categories WHERE id = ?", [id]);
    return res.status(200).json({
      message: `date with Id = ${instructionId} was deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------

town.get("/", index);
town.post("/", create);
town.delete("/:id", deleteById);
town.put("/", update);

export default town;
