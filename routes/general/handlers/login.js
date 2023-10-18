import { Router } from "express";
import conn from "../../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenSecretLevelOne = process.env.TOKEN_SECRET_LEVELONE;
const tokenSecretLevelTwo = process.env.TOKEN_SECRET_LEVELTWO;

const login = Router();

async function validate(req, res) {
  const { username, password } = req.body;
  let userType = "admin";

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide a username and password" });
  }
  let user;
  try {
    user = await conn.awaitQuery("SELECT * FROM employees WHERE username = ?", [
      username,
    ]);
    if (!user.length > 0) {
      userType = "student";
      user = await conn.awaitQuery(
        "SELECT * FROM students WHERE username = ?",
        [username]
      );
    }

    if (user.length > 0) {
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Your username or password are incorrect" });
      }

      let token = null;
      if (userType === "admin") {
        token = jwt.sign({ userId: user[0].id }, tokenSecretLevelTwo);
      } else if (userType === "student") {
        token = jwt.sign({ userId: user[0].id }, tokenSecretLevelOne);
      } else {
        return res.status(500).json({ message: "Something Went Wrong" });
      }

      let returnedUser;

      if (userType === "admin") {
        returnedUser = {
          id: user[0].id,
          username: user[0].username,
          name: user[0].name,
          token: token,
          userType: userType,
        };
      } else if (userType === "student") {
        returnedUser = {
          id: user[0].id,
          nationalId: user[0].nationalId,
          username: user[0].username,
          name: user[0].name,
          token: token,
          userType: userType,
        };
      }

      return res.status(200).json(returnedUser);
    }
    return res
      .status(401)
      .json({ message: "Your username or password are incorrect" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
}

login.post("/", validate);

export default login;
