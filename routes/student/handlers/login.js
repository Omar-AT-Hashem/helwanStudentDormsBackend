import { Router } from "express";

import conn from "../../../config/db.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "../../../middleware/authenticateToken.js";

dotenv.config();

const login = Router();

const tokenSecret = process.env.TOKEN_SECRET_STUDENT;

async function authenticate(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide a username and password" });
  }

  try {
    const student = await conn.awaitQuery(
      "SELECT * FROM students WHERE username = ?",
      [username]
    );

    if (student.length > 0) {
      const passwordMatch = await bcrypt.compare(
        password,
        student[0].password
      );
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Your username or password are incorrect" });
      }
      const token = jwt.sign({ userId: student[0].id }, tokenSecret);
      const returnedEmployee = {
        id: student[0].id,
        username: student[0].username,
        name: student[0].name,
        token: token,
      };
      return res.status(200).json(returnedEmployee);
    }
    return res
      .status(401)
      .json({ message: "Your username or password are incorrect" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
}

login.post("/test", authenticateToken, (req, res) => {
  return res.json({ message: "token valid", id: req.userId });
});

login.post("/", authenticate);

export default login;
