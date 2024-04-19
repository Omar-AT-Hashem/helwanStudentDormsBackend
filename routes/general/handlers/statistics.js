import { Router } from "express";
import conn from "../../../config/db.js";
import { compareSync } from "bcrypt";
import authenticateTokenLevelTwo from "../../../middleware/authenticateTokenLevelTwo.js";

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
          title: "اجمالي الطلاب",
          value: totalMaleApplicants,
        },
        {
          title: "اجمالي الطالبات",
          value: totalFemaleApplicants,
        },
        {
          title: "المتقدمين الطلاب المقبولين",
          value: approvedAppliedMales.length,
        },
        {
          title: "المتقدمين الطالبات المقبولين",
          value: approvedAppliedFemales.length,
        },
        {
          title: "المتقدمين الطلاب غير المقبولين",
          value: unApprovedAppliedMales.length,
        },
        {
          title: "المتقدمين الطالبات غير المقبولين",
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

async function getHousedStats(req, res) {
  try {
    const beds = await conn.awaitQuery(
      "SELECT *, floors.id as flrId, rooms.id as rmId, beds.id as bdId, buildings.id as bldId, buildings.type as bldType, rooms.type as rmType FROM beds INNER JOIN rooms ON rooms.id = beds.roomId INNER JOIN floors ON floors.id = rooms.floorId INNER JOIN buildings on buildings.id = floors.buildingId;"
    );

    const housedMalesNormal = beds.filter(
      (bed) =>
        bed.isOccupied == 1 && bed.bldType == "M" && bed.rmType == "سكن عادي"
    ).length;

    const housedFemalesNormal = beds.filter(
      (bed) =>
        bed.isOccupied == 1 && bed.bldType == "F" && bed.rmType == "سكن عادي"
    ).length;

    const housedMalesSpecial = beds.filter(
      (bed) =>
        bed.isOccupied == 1 && bed.bldType == "M" && bed.rmType == "سكن مميز"
    ).length;

    const housedFemalesSpecial = beds.filter(
      (bed) =>
        bed.isOccupied == 1 && bed.bldType == "F" && bed.rmType == "سكن مميز"
    ).length;

    const totalFemalesHoused = housedFemalesNormal + housedFemalesSpecial;

    const totalMalesHoused = housedMalesNormal + housedMalesSpecial;

    return res.status(200).json({
      title: "الساكنين",
      data: [
        {
          title: "اجمالي الطلاب الساكنين",
          value: totalMalesHoused,
        },
        {
          title: "اجمالي الطالبات الساكنين",
          value: totalFemalesHoused,
        },
        {
          title: "الطلاب الساكنين سكن عادي",
          value: housedMalesNormal,
        },
        {
          title: "الطالبات الساكنين سكن عادي",
          value: housedFemalesNormal,
        },
        {
          title: "الطلاب الساكنين سكن مميز",
          value: housedMalesSpecial,
        },
        {
          title: "الطالبات الساكنين سكن مميز",
          value: housedFemalesSpecial,
        },
      ],
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

async function getHousingStats(req, res) {
  try {
    const beds = await conn.awaitQuery(
      "SELECT *, floors.id as flrId, rooms.id as rmId, beds.id as bdId, buildings.id as bldId, buildings.type as bldType, rooms.type as rmType FROM beds INNER JOIN rooms ON rooms.id = beds.roomId INNER JOIN floors ON floors.id = rooms.floorId INNER JOIN buildings on buildings.id = floors.buildingId;"
    );

    const buildings = await conn.awaitQuery("SELECT * FROM buildings;");

    const towns = await conn.awaitQuery("SELECT * FROM towns;");

    const floors = await conn.awaitQuery("SELECT * FROM floors;");

    const rooms = await conn.awaitQuery("SELECT * FROM rooms;");

    const maleBuildings = buildings.filter((building) => building.type == "M");

    const femaleBuildings = buildings.filter(
      (building) => building.type == "F"
    );

    const totalFemaleSpecialHousingBeds = beds.filter(
      (bed) => bed.bldType == "F" && bed.rmType == "سكن مميز"
    );

    const totalMaleSpecialHousingBeds = beds.filter(
      (bed) => bed.bldType == "M" && bed.rmType == "سكن مميز"
    );

    const totalFemaleNormalHousingBeds = beds.filter(
      (bed) => bed.bldType == "F" && bed.rmType == "سكن عادي"
    );

    const totalMaleNormalHousingBeds = beds.filter(
      (bed) => bed.bldType == "M" && bed.rmType == "سكن عادي"
    );

    const availabeNormalMalesHousingBeds = beds.filter(
      (bed) =>
        bed.isOccupied == 0 && bed.bldType == "M" && bed.rmType == "سكن عادي"
    );

    const availabeSpecialMalesHousingBeds = beds.filter(
      (bed) =>
        bed.isOccupied == 0 && bed.bldType == "M" && bed.rmType == "سكن مميز"
    );

    const availabeNormalFemalesHousingBeds = beds.filter(
      (bed) =>
        bed.isOccupied == 0 && bed.bldType == "F" && bed.rmType == "سكن عادي"
    );

    const availabeSpecialFemalesHousingBeds = beds.filter(
      (bed) =>
        bed.isOccupied == 0 && bed.bldType == "F" && bed.rmType == "سكن مميز"
    );

    return res.status(200).json({
      title: "موارد السكن",
      data: [
        {
          title: "اجمالي المدن",
          value: towns.length,
        },
        {
          title: "اجمالي المباني",
          value: buildings.length,
        },
        {
          title: "مباني الطلاب",
          value: maleBuildings.length,
        },
        {
          title: "مباني الطالبات",
          value: femaleBuildings.length,
        },
        {
          title: "اجمالي الغرف",
          value: rooms.length,
        },
        {
          title: "اجمالي السراير",
          value: floors.length,
        },
        {
          title: "سراير الطلاب المميزه",
          value: totalMaleSpecialHousingBeds.length,
        },
        {
          title: "سراير الطلاب المميزه المتاحه",
          value: availabeSpecialMalesHousingBeds.length,
        },
        {
          title: "سراير الطالبات المميزه",
          value: totalFemaleSpecialHousingBeds.length,
        },
        {
          title: "سراير الطالبات المميزه المتاحه",
          value: availabeSpecialFemalesHousingBeds.length,
        },
        {
          title: "سراير الطلاب العاديه",
          value: totalMaleNormalHousingBeds.length,
        },
        {
          title: "سراير الطلاب العاديه المتاحه",
          value: availabeNormalMalesHousingBeds.length,
        },
        {
          title: "سراير الطالبات العاديه",
          value: totalFemaleNormalHousingBeds.length,
        },
        {
          title: "سراير الطالبات العاديه المتاحه",
          value: availabeNormalFemalesHousingBeds.length,
        },
      ],
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
//----------------------------------------------------------------

async function getMealsStats(req, res) {
  try {
    const meals = await conn.awaitQuery("SELECT * FROM recievedmeals");

    const recievedBreakfast = meals.filter(
      (meal) => meal.breakfast == 1
    ).length;
    const recievedLunch = meals.filter((meal) => meal.lunch == 1).length;
    const recievedDinner = meals.filter((meal) => meal.dinner == 1).length;

    return res.status(200).json({
      title: "الوجبات",
      data: [
        {
          title: " الفطور المسلم",
          value: recievedBreakfast,
        },
        {
          title: " الغداء المسلم",
          value: recievedLunch,
        },
        {
          title: "العشاء المسلم",
          value: recievedDinner,
        },
      ],
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//----------------------------------------------------------------

statistics.get(
  "/applicants-statistics",
  authenticateTokenLevelTwo,
  getApplicantStats
);
statistics.get("/housed-statistics", authenticateTokenLevelTwo, getHousedStats);
statistics.get(
  "/housing-statistics",
  authenticateTokenLevelTwo,
  getHousingStats
);
statistics.get("/meals-statistics", authenticateTokenLevelTwo, getMealsStats);

export default statistics;
