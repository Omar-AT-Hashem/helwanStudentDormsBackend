import { Router } from "express";
import conn from "../../../config/db.js";




const instructions = Router();

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM instructions");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}



instructions.get("/",  index);


export default instructions;
