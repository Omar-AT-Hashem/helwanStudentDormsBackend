import { Router } from "express";

import conn from "../../../config/db.js";

import dotenv from "dotenv";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import XLSX from "xlsx";


dotenv.config();

const recievedMeal = Router();

const upload = multer();

const tokenSecret = process.env.TOKEN_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function recieveMeals(req, res) {
  try {
    const recievedMealsFile = XLSX.read(req.file.buffer);
    var sheet_name_list = recievedMealsFile.SheetNames;
    var recievedMealsData = XLSX.utils.sheet_to_json(
      recievedMealsFile.Sheets[sheet_name_list[0]]
    );
    
    recievedMealsData.forEach(async (recievedMeal) => {
      const { nationalId, breakfast, lunch, dinner, date } = recievedMeal;
      await conn.awaitQuery(
        "INSERT INTO recievedmeals (studentNationalId, breakfast, lunch, dinner, date) VALUES (?, ?, ?, ?, ?);",
        [nationalId, breakfast, lunch, dinner, date]
      );
    });

     return   res.status(200).json({ message: "Meals recieved successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

recievedMeal.post("/recieve-meals", upload.single("recievedMeals"),
  recieveMeals
);

export default recievedMeal;
