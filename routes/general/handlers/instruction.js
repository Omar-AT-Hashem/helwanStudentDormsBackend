import { Router } from "express";
import conn from "../../../config/db.js";
import authenticateTokenLevelOne from "../../../middleware/authenticateTokenLevelOne.js";
import authenticateTokenLevelTwo from "../../../middleware/authenticateTokenLevelTwo.js";
import editInstructionsPerm from "../../../middleware/perms/editInstructionsPerm.js";

const instructions = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM instructions");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function create(req, res) {
  try {
    const { instruction } = req.body;

    if (!instruction) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const created = await conn.awaitQuery(
      "INSERT INTO instructions (instruction) VALUES (?)",
      [instruction]
    );

    res
      .status(201)
      .json({ message: "instruction created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function update(req, res) {
  try {
    const { id, instruction } = req.body;

    if (!instruction || !id) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    await conn.awaitQuery(
      "UPDATE instructions SET instruction = ? WHERE id = ?",
      [instruction, id]
    );

    res.status(201).json({ message: "instruction Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function deleteById(req, res) {
  const instructionId = req.params.id;
  try {
    await conn.awaitQuery("DELETE FROM instructions WHERE id = ?", [
      instructionId,
    ]);
    return res.status(200).json({
      message: `Instruction with Id = ${instructionId} was deleted successfully`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

instructions.get("/", index);
instructions.post("/", authenticateTokenLevelTwo, editInstructionsPerm, create);
instructions.put("/", authenticateTokenLevelTwo, editInstructionsPerm, update);
instructions.delete(
  "/:id",
  authenticateTokenLevelTwo,
  editInstructionsPerm,
  deleteById
);

export default instructions;
