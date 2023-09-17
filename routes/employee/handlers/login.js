import { Router } from "express";

import { Employee } from "../../../models/employee.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// import { Student } from "../../../models/student.js";
// import { StudentAccomodation } from "../../../models/studentAccomodation.js";
// import { Penalty } from "../../../models/penalty.js";

dotenv.config();

const login = Router();

const tokenSecret = process.env.TOKEN_SECRET;

async function authenticate(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide a username and password" });
  }

  try {
    const employee = await Employee.findOne({
      where: {
        username: username,
      },
    });

    if (employee) {
      const passwordMatch = await bcrypt.compare(password, employee.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Your username or password are incorrect" });
      }
      const token = jwt.sign({ userId: employee.id }, tokenSecret);
     const returnedEmployee = {
        id: employee.id,
        username: employee.username,
        name: employee.name,
        token: token,
      };
      return res.status(200).json( returnedEmployee );
    }

    return res
      .status(401)
      .json({ message: "Your username or password are incorrect" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
}

login.post("/", authenticate);

export default login;
