import { Router } from "express";
import conn from "../../../config/db.js";

const statistics = Router();

//----------------------------------------------------------------

async function getApplicantStats(req, res) {
  try {
    const oldAppliedMale = await conn.awaitQuery(
      "SELECT * FROM students WHERE isNew = ? AND gender = ? AND isAccepted = ? ",
      [0, "M", 0]
    );
    const oldAppliedFemale = await conn.awaitQuery(
      "SELECT * FROM students WHERE isNew = ? AND gender = ? AND isAccepted = ? ",
      [0, "F", 0]
    );

    const newAppliedMale = await conn.awaitQuery(
      "SELECT * FROM students WHERE isNew = ? AND gender = ? AND isAccepted = ? ",
      [1, "M", 0]
    );

    const newAppliedFemale = await conn.awaitQuery(
      "SELECT * FROM students WHERE isNew = ? AND gender = ? AND isAccepted = ? ",
      [1, "F", 0]
    );

    const approvedAppliedMales = await conn.awaitQuery(
      "SELECT * FROM students WHERE  gender = ? AND isApproved = ? AND isAccepted = ?",
      ["M", 1, 0]
    );

    const approvedAppliedFemales = await conn.awaitQuery(
      "SELECT * FROM students WHERE  gender = ? AND isApproved = ? AND isAccepted = ?",
      ["F", 1, 0]
    );

    const unApprovedAppliedMales = await conn.awaitQuery(
      "SELECT * FROM students WHERE  gender = ? AND isApproved = ? AND isAccepted = ?",
      ["M", -1, 0]
    );

    const unApprovedAppliedFemales = await conn.awaitQuery(
      "SELECT * FROM students WHERE  gender = ? AND isApproved = ? AND isAccepted = ?",
      ["F", -1, 0]
    );

    const totalApplicants =
      oldAppliedMale.length +
      oldAppliedFemale.length +
      newAppliedMale.length +
      newAppliedFemale.length;

    const totalFemaleApplicants =
      oldAppliedFemale.length + newAppliedFemale.length;

    const totalMaleApplicants = oldAppliedMale.length + newAppliedMale.length;

    const totalOldAppliedApplicants =
      oldAppliedMale.length + oldAppliedFemale.length;
    const totalNewAppliedApplicants =
      newAppliedMale.length + newAppliedFemale.length;

    return res.status(200).json({
      title: "المتقدمين",
      data: [
        {
          title: "اجمالي المتقدمين",
          value: totalApplicants,
        },
        {
          title: "اجمالي الذكور",
          value: totalMaleApplicants,
        },
        {
          title: "اجمالي الاناث",
          value: totalFemaleApplicants,
        },
        {
          title: "المتقدمين الذكور المقبولين",
          value: approvedAppliedMales.length,
        },
        {
          title: "المتقدمين الاناث المقبولين",
          value: approvedAppliedFemales.length,
        },
        {
          title: "المتقدمين الذكور غير المقبولين",
          value: unApprovedAppliedMales.length,
        },
        {
          title: "المتقدمين الاناث غير المقبولين",
          value: unApprovedAppliedFemales.length,
        },
        {
          title: "المتقدمين الجديدين",
          value: totalNewAppliedApplicants,
        },
        {
          title: "المتقدمين القديمين",
          value: totalOldAppliedApplicants,
        },
      ],
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function create(req, res) {
  try {
    const { adminId, adminName, adminUsername, action, objectId, objectName } =
      req.body;

    if (
      !adminId ||
      !adminName ||
      !adminUsername ||
      !action ||
      !objectId ||
      !objectName
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const currentDateTime = new Date(Date.now() - timezoneOffset)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const created = await conn.awaitQuery(
      "INSERT INTO logs (adminId, adminName, adminUsername, action, objectId, objectName, dateTime) VALUES (?,?,?,?,?,?,?)",
      [
        adminId,
        adminName,
        adminUsername,
        action,
        objectId,
        objectName,
        currentDateTime,
      ]
    );
    res.status(201).json({ message: "log created", id: created.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//----------------------------------------------------------------

//----------------------------------------------------------------

statistics.get("/applicants-statistics", getApplicantStats);
statistics.post("/", create);

export default statistics;
