import { Router } from "express";

import { Employee } from "../../../models/employee.js";

const login = Router();

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
        password: password,
      },
    });

    if (employee) {
      return res.status(200).json({ employee });
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
