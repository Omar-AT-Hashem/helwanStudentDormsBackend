import { Router } from "express";

import conn from "../../../config/db.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "../../../middleware/authenticateToken.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// import multer from "multer";

dotenv.config()

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// export const uploadPath = path.join(
//   __dirname,
//   "..",
//   "..",
//   "..",
//   "..",
//   "images",
//   "/"
// );

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.originalname.split(".")[0] +
//         Date.now() +
//         "." +
//         file.originalname.split(".")[file.originalname.split(".").length - 1]
//     );
//   },
// });

// const upload = multer({ storage: storage });





const student = Router();

const saltRounds = parseInt(process.env.SALT_ROUNDS);
const tokenSecret = process.env.TOKEN_SECRET_STUDENT;

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM students");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}


async function getStudentById(req, res) {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: "Please provide a studentId" });
  }

  try {
    const student = await conn.awaitQuery(
      "SELECT * FROM students WHERE id = ? ",
      [studentId]
    );
    return res.status(200).json(student[0]);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function register(req, res) {
  try {
    // const image = req.file;
    const {
      nationalId,
      name,
      birthday,
      placeOfBirth,
      gender,
      telephone,
      mobile,
      email,
      religion,
      faculty,
      fatherName,
      fatherNationalId,
      fatherOccupation,
      fatherNumber,
      guardianName,
      guardianNationalId,
      guardianRelationship,
      residence,
      addressDetails,
      isDisabled,
      familyAbroad,
      highschoolAbroad,
      highschoolSpecialization,
      highschoolGrade,
      accomodationType,
      accomodationWithNutrition,
      password,
    } = req.body;

    if (
      !nationalId ||
      !name ||
      !birthday ||
      !placeOfBirth ||
      !gender ||
      !telephone ||
      !mobile ||
      !email ||
      !religion ||
      !faculty ||
      !fatherName ||
      !fatherNationalId ||
      !fatherOccupation ||
      !fatherNumber ||
      !guardianName ||
      !guardianNationalId ||
      !guardianRelationship ||
      !residence ||
      !addressDetails ||
      !highschoolSpecialization ||
      !highschoolGrade ||
      !accomodationType ||
      !password
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    // Check if the user already exists
    const existingUser = await conn.awaitQuery(
      "SELECT * FROM students WHERE nationalId = ?",
      [nationalId]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // const imageName = image.destination.replaceAll("\\", "/") + image.filename;
    const username = nationalId
    const isApproved = 0

    
    // Create a new user
    const newStudent = await conn.awaitQuery(
      "INSERT INTO students (name, birthday,nationalId, placeOfBirth, gender, telephone, mobile, email, religion, faculty, fatherName, fatherNationalId, fatherOccupation, fatherNumber, guardianName, guardianNationalId, guardianRelationship, residence, addressDetails, isDisabled, familyAbroad, highschoolAbroad, highschoolSpecialization, highschoolGrade, accomodationType, accomodationWithNutrition, password, username, isApproved) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
      [
        name,
        birthday,
        nationalId,
        placeOfBirth,
        gender,
        telephone,
        mobile,
        email,
        religion,
        faculty,
        fatherName,
        fatherNationalId,
        fatherOccupation,
        fatherNumber,
        guardianName,
        guardianNationalId,
        guardianRelationship,
        residence,
        addressDetails,
        parseInt(isDisabled),
        parseInt(familyAbroad),
        parseInt(highschoolAbroad),
        highschoolSpecialization,
        highschoolGrade,
        accomodationType,
        parseInt(accomodationWithNutrition),
        hashedPassword,
        username,
        isApproved,
      ]
    );

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function login(req, res) {
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
      const returnedStudent = {
        id: student[0].id,
        nationalId: student[0].nationalId,
        username: student[0].username,
        name: student[0].name,
        token: token,
      };
      return res.status(200).json(returnedStudent);
    }
    return res
      .status(401)
      .json({ message: "Your username or password are incorrect" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
}



student.post("/login", login);

// register.post("/", upload.single("image"), createEmployee);
student.post("/regitser", register);
student.get("/", index);
student.get("/get-by-id/:studentId", getStudentById);

export default student;
