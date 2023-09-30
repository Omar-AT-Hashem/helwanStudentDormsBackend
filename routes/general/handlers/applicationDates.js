import { Router } from "express";
import conn from "../../../config/db.js";




const applicationDates = Router();

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM applicationdates");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}



applicationDates.get("/",  index);


export default applicationDates;
