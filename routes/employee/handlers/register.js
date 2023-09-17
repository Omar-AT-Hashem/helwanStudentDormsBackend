import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Employee } from "../../../models/employee.js";

dotenv.config();

const register = Router();

const tokenSecret = process.env.TOKEN_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function createEmployee(req, res) {
  try {
    const { username, name, password } = req.body;

    if (!username || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    // Check if the user already exists
    const existingUser = await Employee.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newEmployee = await Employee.create({
      username: username,
      name: name,
      password: hashedPassword,
    });

    // Create a JWT token
    const token = jwt.sign({ userId: newEmployee.id }, tokenSecret);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

register.post("/", createEmployee);

export default register;
