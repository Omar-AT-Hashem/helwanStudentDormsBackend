import { Router } from "express";
import conn from "../../../config/db.js";

const fee = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const fees = await conn.awaitQuery("SELECT * FROM fees");
    return res.status(200).json(fees);
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
      "INSERT INTO fees (name, necessaryForNutrition) VALUES (?,?)",
      [name, "no"]
    );

    res.status(201).json({ message: "fee created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function update(req, res) {
  try {
    const { id, name, necessaryForNutrition } = req.body;

    if (!id || !name || !necessaryForNutrition) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    await conn.awaitQuery(
      "UPDATE fees SET name = ?, necessaryForNutrition = ?  WHERE id = ?",
      [name, necessaryForNutrition, id]
    );

    res.status(201).json({ message: "Fee Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function deleteById(req, res) {
  const feeId = req.params.id;
  try {
    await conn.awaitQuery("DELETE FROM fees WHERE id = ?", [feeId]);
    return res.status(200).json({
      message: `date with Id = ${feeId} was deleted successfully`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

//----------------------------------------------------------------

fee.get("/", index);
fee.post("/", create);
fee.delete("/:id", deleteById);
fee.put("/", update);

export default fee;
