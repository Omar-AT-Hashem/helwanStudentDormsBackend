import { Router } from "express";
import conn from "../../../config/db.js";

const log = Router();

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM logs ORDER BY dateTime DESC");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function create(req, res) {
  try {
    const {
      adminId,
      adminName,
      adminUsername,
      action,
      objectId,
      objectName,
    } = req.body;

    if (
      !adminId ||
      !adminName ||
      !adminUsername ||
      !action ||
      !objectId ||
      !objectName
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const currentDateTime = new Date(Date.now() - timezoneOffset)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
      

    const created = await conn.awaitQuery(
      "INSERT INTO logs (adminId, adminName, adminUsername, action, objectId, objectName, dateTime) VALUES (?,?,?,?,?,?,?)",
      [
        adminId,
        adminName,
        adminUsername,
        action,
        objectId,
        objectName,
        currentDateTime,
      ]
    );
    res.status(201).json({ message: "log created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

//----------------------------------------------------------------

log.get("/", index);
log.post("/", create);

export default log;
