import { Router } from "express";

import conn from "../../../config/db.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { distance } from "@turf/turf";
import calculateAge from "../../../helpers/claculateAge.js";


import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import multer from "multer";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "helwanStudentDormsFrontend",
  "public",
  "/"
);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

const upload = multer({ storage: storage });

const student = Router();

const saltRounds = parseInt(process.env.SALT_ROUNDS);
const tokenSecret = process.env.TOKEN_SECRET_STUDENT;

//----------------------------------------------------------------

async function index(req, res) {
  try {
    const students = await conn.awaitQuery("SELECT * FROM students");
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------
async function indexColumn(req, res) {
  try {
    const { column, value, descriminator, options } = req.params;
    let students;
    if (descriminator == "none") {
      students = await conn.awaitQuery(
        `SELECT * FROM students WHERE ${column} = ${value}`
      );
    }
    if (descriminator == "gender") {
      if (options == "m")
        students = await conn.awaitQuery(
          `SELECT * FROM students WHERE ${column} = ${value} AND gender = 'M' `
        );
      if (options == "f")
        students = await conn.awaitQuery(
          `SELECT * FROM students WHERE ${column} = ${value} AND gender = 'F' `
        );
    }

    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
//----------------------------------------------------------------

async function getByGender(req, res) {
  try {
    const { gender } = req.params;
    const students = await conn.awaitQuery(
      `SELECT * FROM students WHERE gender = '${gender}'`
    );
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function register(req, res) {
  try {
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
      academicYear,
      grade,
      isNew,
      accomodationType,
      accomodationWithNutrition,
      password,
      latitude,
      longitude,
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
      !academicYear ||
      !grade ||
      !accomodationType ||
      !password
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    if (!longitude || !latitude) {
      longitude = 31.316204046556752;
      latitude = 29.866227059916042;
    }

    // Check if the user already exists
    const existingUser = await conn.awaitQuery(
      "SELECT * FROM students WHERE nationalId = ?",
      [nationalId]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    var userLocation = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    };

    var universityLocation = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [31.316204046556752, 29.866227059916042],
      },
    };

    const dist = distance(userLocation, universityLocation, "kilometers");
    const age = calculateAge(birthday);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // const imageName = image.destination.replaceAll("\\", "/") + image.filename;
    let addSerial = false;
    let randomSerial = Math.floor(1000000 + Math.random() * 9000000);
    const username = nationalId;
    const isApproved = 0;
    const isAccepted = 0;
    const isHoused = 0;
    const date = new Date();
    const dateOfApplying = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    const serialResult = await conn.awaitQuery(
      "SELECT * FROM students WHERE serialNumber = ?",
      [randomSerial]
    );

    while (!addSerial) {
      if (serialResult.length > 0) {
        randomSerial = Math.floor(1000000 + Math.random() * 9000000);
        serialResult = await conn.awaitQuery(
          "SELECT * FROM students WHERE serialNumber = ?",
          [randomSerial]
        );
      } else {
        addSerial = true;
      }
    }

    if (addSerial) {
      // Create a new user
      const newStudent = await conn.awaitQuery(
        "INSERT INTO students (name, birthday,age, distance, dateOfApplying, nationalId, placeOfBirth, gender, telephone, mobile, email, religion, faculty, fatherName, fatherNationalId, fatherOccupation, fatherNumber, guardianName, guardianNationalId, guardianRelationship, residence, addressDetails, isDisabled, familyAbroad, highschoolAbroad, highschoolSpecialization, academicYear, grade, accomodationType, accomodationWithNutrition, password, username, isNew, isApproved, isAccepted, isHoused, serialNumber) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [
          name,
          birthday,
          parseInt(age),
          parseFloat(dist),
          dateOfApplying,
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
          parseInt(academicYear),
          parseFloat(grade),
          accomodationType,
          parseInt(accomodationWithNutrition),
          hashedPassword,
          username,
          isNew,
          isApproved,
          isAccepted,
          isHoused,
          randomSerial,
        ]
      );
    }

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
//---------------------------------------------------------------------

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
      const passwordMatch = await bcrypt.compare(password, student[0].password);
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
//----------------------------------------------------------------

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
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
//----------------------------------------------------------------

async function getStudentByNationalId(req, res) {
  const { studentNationalId } = req.params;

  if (!studentNationalId) {
    return res
      .status(400)
      .json({ message: "Please provide a studentNationalId" });
  }

  try {
    const student = await conn.awaitQuery(
      "SELECT * FROM students WHERE nationalId = ? ",
      [studentNationalId]
    );
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
//----------------------------------------------------------------

async function update(req, res) {
  try {
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
      grade,
      accomodationType,
      accomodationWithNutrition,
      password,
      id,
    } = req.body;

    // if (!instruction || !id) {
    //   return res
    //     .status(400)
    //     .json({ message: "Please provide all the required fields" });
    // }

    const nationalIdCheck = await conn.awaitQuery(
      "SELECT * from students WHERE nationalId = ?",
      [nationalId]
    );

    const currentStudent = await conn.awaitQuery(
      "SELECT * from students WHERE id = ?",
      [id]
    );

    if (
      nationalIdCheck.length > 0 &&
      nationalId != currentStudent[0].nationalId
    ) {
      return res.status(409).json({ message: "The nationalId already exists" });
    }

    await conn.awaitQuery(
      "UPDATE students SET nationalId = ?, name = ?, birthday = ?, placeOfBirth = ?, gender = ?, telephone = ?, mobile = ?, email = ?, religion = ?, faculty = ?, fatherName = ?, fatherNationalId = ?, fatherOccupation = ?, fatherNumber = ?, guardianName = ?, guardianNationalId = ?, guardianRelationship = ?, residence = ?, addressDetails = ?, isDisabled = ?, familyAbroad = ?, highschoolAbroad = ?, highschoolSpecialization = ?, grade = ?, accomodationType = ?, accomodationWithNutrition = ? WHERE id = ?;",
      [
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
        grade,
        accomodationType,
        accomodationWithNutrition,
        id,
      ]
    );

    res.status(201).json({ message: "student Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------
async function updateImage(req, res) {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Please provide all the fields" });
    }

    const { id } = req.body;
    const imagePath = `/${image.filename}`;

    await conn.awaitQuery("UPDATE students SET image = ?  WHERE id = ?;", [
      imagePath,
      id,
    ]);

    return res
      .status(201)
      .json({ message: "student Updated", filePath: imagePath });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
//----------------------------------------------------------------
async function deleteImage(req, res) {
  try {
    const imagePath = null;
    const { id } = req.body;
    await conn.awaitQuery("UPDATE students SET image = ?  WHERE id = ?;", [
      imagePath,
      id,
    ]);
    res.status(201).json({ message: "student Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function massImageUpload(req, res) {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Please provide all the fields" });
    }

    const imagePath = `/${image.filename}`;
    const originalName = image.originalname.split(".")[0];

    const present = await conn.awaitQuery(
      "SELECT * FROM students WHERE nationalId = ?",
      [originalName]
    );

    if (present.length > 0) {
      await conn.awaitQuery(
        "UPDATE students SET image = ?  WHERE nationalId = ?;",
        [imagePath, originalName]
      );
    }
    return res
      .status(201)
      .json({ message: "student Updated", filePath: imagePath });
  } catch (error) {
    console.error(error);
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function assessStudents(req, res) {
  try {
    const numberOFStudentsToBeAccepted = 6;

    const malesNormal = await conn.awaitQuery(
      "SELECT * FROM students WHERE isApproved = ? AND gender = ? AND accomodationType = ? ORDER BY isNew ASC, academicYear DESC, grade DESC, age ASC, distance DESC;",
      [1, "M", "سكن عادي"]
    );

    const femalesNomral = await conn.awaitQuery(
      "SELECT * FROM students WHERE isApproved = ? AND gender = ? AND accomodationType = ? ORDER BY isNew ASC, academicYear DESC, grade DESC, age ASC, distance DESC;",
      [1, "F", "سكن عادي"]
    );

    const malesSpecial = await conn.awaitQuery(
      "SELECT * FROM students WHERE isApproved = ? AND gender = ? AND accomodationType = ? ORDER BY isNew ASC, academicYear DESC, grade DESC, age ASC, distance DESC;",
      [1, "M", "سكن مميز"]
    );

    const femalesSpecial = await conn.awaitQuery(
      "SELECT * FROM students WHERE isApproved = ? AND gender = ? AND accomodationType = ? ORDER BY isNew ASC, academicYear DESC, grade DESC, age ASC, distance DESC;",
      [1, "F", "سكن مميز"]
    );

    const malesNormalBeds = await conn.awaitQuery(
      "SELECT *, floors.id as flrId, rooms.id as rmId, beds.id as bdId, buildings.id as bldId, buildings.type as bldType, rooms.type as rmType FROM beds INNER JOIN rooms ON rooms.id = beds.roomId INNER JOIN floors ON floors.id = rooms.floorId INNER JOIN buildings on buildings.id = floors.buildingId WHERE rooms.type = ? AND buildings.type = ?",
      ["سكن عادي", "M"]
    );
    const femalesNormalBeds = await conn.awaitQuery(
      "SELECT *, floors.id as flrId, rooms.id as rmId, beds.id as bdId, buildings.id as bldId, buildings.type as bldType, rooms.type as rmType FROM beds INNER JOIN rooms ON rooms.id = beds.roomId INNER JOIN floors ON floors.id = rooms.floorId INNER JOIN buildings on buildings.id = floors.buildingId WHERE rooms.type = ? AND buildings.type = ?",
      ["سكن عادي", "F"]
    );
    const malesSpecialBeds = await conn.awaitQuery(
      "SELECT *, floors.id as flrId, rooms.id as rmId, beds.id as bdId, buildings.id as bldId, buildings.type as bldType, rooms.type as rmType FROM beds INNER JOIN rooms ON rooms.id = beds.roomId INNER JOIN floors ON floors.id = rooms.floorId INNER JOIN buildings on buildings.id = floors.buildingId WHERE rooms.type = ? AND buildings.type = ?",
      ["سكن مميز", "M"]
    );
    const femalesSpecialBeds = await conn.awaitQuery(
      "SELECT *, floors.id as flrId, rooms.id as rmId, beds.id as bdId, buildings.id as bldId, buildings.type as bldType, rooms.type as rmType FROM beds INNER JOIN rooms ON rooms.id = beds.roomId INNER JOIN floors ON floors.id = rooms.floorId INNER JOIN buildings on buildings.id = floors.buildingId WHERE rooms.type = ? AND buildings.type = ?",
      ["سكن مميز", "F"]
    );

    let selectedMalesNormal = null;
    let selectedMalesSpecial = null;
    let selectedFemalesNormal = null;
    let selectedFemalesSpecial = null;

    if (malesNormal.length < malesNormalBeds.length) {
      selectedMalesNormal = malesNormal;
    } else {
      selectedMalesNormal = malesNormal.slice(0, malesNormalBeds.length - 1);
    }

    if (femalesNomral < femalesNormalBeds) {
      selectedFemalesNormal = femalesNomral;
    } else {
      selectedFemalesNormal = femalesNomral.slice(
        0,
        femalesNormalBeds.length - 1
      );
    }

    if (malesSpecial < malesSpecialBeds) {
      selectedMalesSpecial = malesSpecial;
    } else {
      selectedMalesSpecial = malesSpecial.slice(0, malesSpecialBeds.length - 1);
    }

    if (femalesSpecial < femalesSpecialBeds) {
      selectedFemalesSpecial = femalesSpecial;
    } else {
      selectedFemalesSpecial = femalesSpecial.slice(
        0,
        femalesSpecialBeds.length - 1
      );
    }

    await Promise.all(
      selectedMalesNormal.map((student) => {
        return conn.awaitQuery(
          "UPDATE students SET isAccepted = ?  WHERE id = ?",
          [1, student.id]
        );
      })
    );

    await Promise.all(
      selectedFemalesNormal.map((student) => {
        return conn.awaitQuery(
          "UPDATE students SET isAccepted = ?  WHERE id = ?",
          [1, student.id]
        );
      })
    );

    await Promise.all(
      selectedMalesSpecial.map((student) => {
        return conn.awaitQuery(
          "UPDATE students SET isAccepted = ?  WHERE id = ?",
          [1, student.id]
        );
      })
    );

    await Promise.all(
      selectedFemalesSpecial.map((student) => {
        return conn.awaitQuery(
          "UPDATE students SET isAccepted = ?  WHERE id = ?",
          [1, student.id]
        );
      })
    );

    res.status(200).json({ message: "Student assesment complete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function approveOrReject(req, res) {
  try {
    const { approveORreject } = req.params;

    if (approveORreject !== "approve" && approveORreject !== "reject") {
      return res
        .status(400)
        .json({ message: "parameter must either be approve or reject" });
    }

    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    if (approveORreject == "reject") {
      await conn.awaitQuery(
        "UPDATE students SET isApproved = ?  WHERE id = ?;",
        [-1, id]
      );

      return res.status(201).json({ message: "student rejected" });
    }

    if (approveORreject == "approve") {
      await conn.awaitQuery(
        "UPDATE students SET isApproved = ?  WHERE id = ?;",
        [1, id]
      );
      return res.status(201).json({ message: "student approved" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function suspend(req, res) {
  const id = req.params.id;
  try {
    await conn.awaitQuery(
      "UPDATE students SET isHoused = ?, isAccepted = ?, isApproved = ? WHERE id = ?;",
      [-1, 0, -1, id]
    );

    await conn.awaitQuery(
      "UPDATE beds SET isOccupied = ?, occupant = ? WHERE id = ?;",
      [0, null, id]
    );

    return res.status(201).json({ message: "student Updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function getStudentsWithoutPictures(req, res) {
  const { gender } = req.body;
  try {
    const data = await conn.awaitQuery(
      "SELECT id, name, nationalId, academicYear FROM students WHERE image IS NULL AND gender = ?",
      [gender]
    );

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

async function getSuspendedStudents(req, res) {
  const { gender } = req.body;
  try {
    const data = await conn.awaitQuery(
      "SELECT id, name, nationalId, academicYear FROM students WHERE isHoused = ? AND isAccepted = ? AND isApproved = ? AND gender = ?",
      [-1, 0, -1, gender]
    );

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------
async function meta(req, res) {
  try {
    const applicantFemales = await conn.awaitQuery(
      "SELECT * FROM students WHERE gender = ? AND isApproved = ? AND isAccepted = ?",
      ["F", 1, 0]
    );
    const applicantMales = await conn.awaitQuery(
      "SELECT * FROM students WHERE gender = ? AND isApproved = ? AND isAccepted = ?",
      ["M", 1, 0]
    );

    const applicantFemalesCount = applicantFemales.length;
    const applicantMalesCount = applicantMales.length;
    const totalApplicants = applicantFemalesCount + applicantMalesCount;

    res.status(200).json({
      applicantFemalesCount: applicantFemalesCount,
      applicantMalesCount: applicantMalesCount,
      totalApplicants: totalApplicants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

student.get("/", index);
student.get("/meta", meta);
student.get("/get-by-gender/:gender", getByGender);
student.get("/column/:column/:value/:descriminator/:options", indexColumn);
student.get("/get-by-id/:studentId", getStudentById);
student.get("/get-by-nationalId/:studentNationalId", getStudentByNationalId);
student.post("/get-students-without-pictures", getStudentsWithoutPictures);
student.post("/get-suspended-students", getSuspendedStudents);
student.post("/login", login);
student.post("/register", register);
student.post("/approve-or-reject/:approveORreject", approveOrReject);
student.put("/update-image", upload.single("image"), updateImage);
student.put("/delete-image", deleteImage);
student.put("/", update);
student.put("/assess-students", assessStudents);
student.put("/suspend/:id", suspend);
student.post("/mass-image-upload", upload.single("image"), massImageUpload);

export default student;
