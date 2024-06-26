import { Router } from "express";

import conn from "../../../config/db.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateTokenLevelTwo from "../../../middleware/authenticateTokenLevelTwo.js";
import superAdminPerm from "../../../middleware/perms/superAdminPerm.js";

dotenv.config();

const employee = Router();

const tokenSecret = process.env.TOKEN_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const employees = await conn.awaitQuery("SELECT * FROM employees");
    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function register(req, res) {
  try {
    const {
      username,
      name,
      password,
      superAdmin,
      editStudentData,
      applicationApprovals,
      houseStudents,
      unHouseStudents,
      managePenalties,
      suspendStudent,
      manageAbscence,
      manageStudentFees,
      manageBlockMeals,
      uploadStudentImages,
      editApplicationDates,
      editInstructions,
      uploadMeals,
      editFees,
      editHousingResources,
      studentEvaluation,
      systemWash,
      deleteStudent
    } = req.body;

    if (
      !username ||
      !password ||
      !name ||
      superAdmin === undefined ||
      editStudentData === undefined ||
      applicationApprovals === undefined ||
      houseStudents === undefined ||
      unHouseStudents === undefined ||
      managePenalties === undefined ||
      suspendStudent === undefined ||
      manageAbscence === undefined ||
      manageStudentFees === undefined ||
      manageBlockMeals === undefined ||
      uploadStudentImages === undefined ||
      editApplicationDates === undefined ||
      editInstructions === undefined ||
      uploadMeals === undefined ||
      editFees === undefined ||
      editHousingResources === undefined ||
      studentEvaluation === undefined ||
      systemWash === undefined ||
      deleteStudent === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    // Check if the user already exists
    const existingUser = await conn.awaitQuery(
      "SELECT * FROM employees WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newEmployee = await conn.awaitQuery(
      "INSERT INTO employees (username, name, password, superAdmin, editStudentData, applicationApprovals,  houseStudents, unHouseStudents, managePenalties, suspendStudent, manageAbscence, manageStudentFees, manageBlockMeals, uploadStudentImages, editApplicationDates, editInstructions, uploadMeals, editFees,  editHousingResources,  studentEvaluation,  systemWash, deleteStudent) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        username,
        name,
        hashedPassword,
        superAdmin,
        editStudentData,
        applicationApprovals,
        houseStudents,
        unHouseStudents,
        managePenalties,
        suspendStudent,
        manageAbscence,
        manageStudentFees,
        manageBlockMeals,
        uploadStudentImages,
        editApplicationDates,
        editInstructions,
        uploadMeals,
        editFees,
        editHousingResources,
        studentEvaluation,
        systemWash,
        deleteStudent
      ]
    );

    // Create a JWT token

    res.status(201).json({ message: "User created", id: newEmployee.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

// async function login(req, res) {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ message: "Please provide a username and password" });
//   }

//   try {
//     const employee = await conn.awaitQuery(
//       "SELECT * FROM employees WHERE username = ?",
//       [username]
//     );

//     if (employee.length > 0) {
//       const passwordMatch = await bcrypt.compare(
//         password,
//         employee[0].password
//       );
//       if (!passwordMatch) {
//         return res
//           .status(401)
//           .json({ message: "Your username or password are incorrect" });
//       }
//       const token = jwt.sign({ userId: employee[0].id }, tokenSecret);
//       const returnedEmployee = {
//         id: employee[0].id,
//         username: employee[0].username,
//         name: employee[0].name,
//         token: token,
//       };
//       return res.status(200).json(returnedEmployee);
//     }
//     return res
//       .status(401)
//       .json({ message: "Your username or password are incorrect" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something Went Wrong" });
//   }
// }

//----------------------------------------------------------------

async function getPermissions(req, res) {
  try {
    const id = req.params.id;
    const permissions = await conn.awaitQuery(
      "SELECT superAdmin, editStudentData, applicationApprovals, houseStudents, unHouseStudents, managePenalties,   suspendStudent, manageAbscence, manageStudentFees, manageBlockMeals, uploadStudentImages, editApplicationDates, editInstructions, uploadMeals, editFees, editHousingResources, studentEvaluation, systemWash, deleteStudent FROM employees WHERE id = ?",
      [id]
    );
    if (permissions.length > 0) {
      return res.status(200).json(permissions[0]);
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function update(req, res) {
  try {
    const {
      id,
      username,
      name,
      password,
      superAdmin,
      editStudentData,
      applicationApprovals,
      houseStudents,
      unHouseStudents,
      managePenalties,
      suspendStudent,
      manageAbscence,
      manageStudentFees,
      manageBlockMeals,
      uploadStudentImages,
      editApplicationDates,
      editInstructions,
      uploadMeals,
      editFees,
      editHousingResources,
      studentEvaluation,
      systemWash,
      deleteStudent
    } = req.body;

    if (
      !id ||
      !username ||
      !password ||
      !name ||
      superAdmin === undefined ||
      editStudentData === undefined ||
      applicationApprovals === undefined ||
      houseStudents === undefined ||
      unHouseStudents === undefined ||
      managePenalties === undefined ||
      suspendStudent === undefined ||
      manageAbscence === undefined ||
      manageStudentFees === undefined ||
      manageBlockMeals === undefined ||
      uploadStudentImages === undefined ||
      editApplicationDates === undefined ||
      editInstructions === undefined ||
      uploadMeals === undefined ||
      editFees === undefined ||
      editHousingResources === undefined ||
      studentEvaluation === undefined ||
      systemWash === undefined ||
      deleteStudent === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }


    const newEmployee = await conn.awaitQuery(
      "UPDATE employees SET superAdmin = ?, editStudentData = ?, applicationApprovals = ?,  houseStudents = ?, unHouseStudents = ?, managePenalties = ?, suspendStudent = ?, manageAbscence = ?, manageStudentFees = ?, manageBlockMeals = ?, uploadStudentImages = ?, editApplicationDates = ?, editInstructions = ?, uploadMeals = ?, editFees = ?,  editHousingResources = ?,  studentEvaluation = ?,  systemWash = ?, deleteStudent = ? WHERE id = ?",
      [
        superAdmin,
        editStudentData,
        applicationApprovals,
        houseStudents,
        unHouseStudents,
        managePenalties,
        suspendStudent,
        manageAbscence,
        manageStudentFees,
        manageBlockMeals,
        uploadStudentImages,
        editApplicationDates,
        editInstructions,
        uploadMeals,
        editFees,
        editHousingResources,
        studentEvaluation,
        systemWash,
        deleteStudent,
        id,
      ]
    );

    // Create a JWT token

    res.status(201).json({ message: "User updated", id: newEmployee.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------
async function deleteById(req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    const permissions = await conn.awaitQuery(
      "DELETE FROM employees WHERE id = ?",
      [id]
    );
    res.status(200).send("deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------

async function verifyTokenPageLoad(req, res) {
  res.status(200).json({ message: "Token Verified" });
}

employee.get("/", authenticateTokenLevelTwo, index);
employee.get("/permissions/:id", authenticateTokenLevelTwo, getPermissions);
// employee.post("/login", login);
employee.post("/register", authenticateTokenLevelTwo, superAdminPerm, register);
employee.put("/", authenticateTokenLevelTwo, superAdminPerm, update);
employee.post("/verify-token-page-load", verifyTokenPageLoad);

employee.delete("/:id", authenticateTokenLevelTwo, superAdminPerm, deleteById);

export default employee;
