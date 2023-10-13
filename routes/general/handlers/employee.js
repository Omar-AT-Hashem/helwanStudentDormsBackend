import { Router } from "express";

import conn from "../../../config/db.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "../../../middleware/authenticateToken.js";


dotenv.config();

const employee = Router();

const tokenSecret = process.env.TOKEN_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

//----------------------------------------------------------------

async function register(req, res) {
  try {
    const { username, name, password } = req.body;

    if (!username || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    // Check if the user already exists
    const existingUser = await conn.awaitQuery("SELECT * FROM employees WHERE username = ?", [username])
    if (existingUser.length > 0) {
        
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newEmployee = await conn.awaitQuery("INSERT INTO employees (username, name, password) VALUES (?,?,?)", [username, name, hashedPassword])


    // Create a JWT token

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------


async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide a username and password" });
  }

  try {
    const employee = await conn.awaitQuery(
      "SELECT * FROM employees WHERE username = ?",
      [username]
    );

    if (employee.length > 0) {
      const passwordMatch = await bcrypt.compare(
        password,
        employee[0].password
      );
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Your username or password are incorrect" });
      }
      const token = jwt.sign({ userId: employee[0].id }, tokenSecret);
      const returnedEmployee = {
        id: employee[0].id,
        username: employee[0].username,
        name: employee[0].name,
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

//----------------------------------------------------------------



employee.post("/login", login);
employee.post("/register", register);

export default employee;