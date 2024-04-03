import { Router } from "express";

import conn from "../../../config/db.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "../../../middleware/authenticateToken.js";

import fs from "fs";
var obj = JSON.parse(fs.readFileSync("./colleges.json", "utf8"));

dotenv.config();

const universityStructure = Router();

const tokenSecret = process.env.TOKEN_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function getFaculties(req, res) {
  try {
    const faculties = await conn.awaitQuery("SELECT * FROM faculties;");
    return res.status(200).json(faculties);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function getStructure(req, res) {
  try {
    return res.status(200).json(obj);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

universityStructure.get("/get-faculties", getFaculties);
universityStructure.get("/get-structure", getStructure);

export default universityStructure;
