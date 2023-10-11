import { Router } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import conn from "../../../config/db.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// import multer from "multer";

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

dotenv.config();

const register = Router();

const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function createEmployee(req, res) {
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

// register.post("/", upload.single("image"), createEmployee);
register.post("/", createEmployee);

export default register;
