import fs from "fs";
import conn from "./config/db.js";
var obj = JSON.parse(fs.readFileSync("./colleges.json", "utf8"));

const buildStructure = async () => {
  obj.forEach(async (faculty) => {
    let addedFaculty = await conn.awaitQuery(
      "INSERT INTO faculties (name) VALUES (?)",
      [faculty.name]
    );
    faculty.departments.forEach(async (department) => {
      let addedDepartment = await conn.awaitQuery(
        "INSERT INTO departments (name, facultyId) VALUES (?, ?)",
        [department.name, addedFaculty.insertId]
      );
      department.programs.forEach(async (program) => {
        let addedProgram = await conn.awaitQuery(
          "INSERT INTO programs (name, departmentId) VALUES (?, ?)",
          [program.name, addedDepartment.insertId]
        );
        program.levels.forEach(async (level) => {
          let addedCourse = await conn.awaitQuery(
            "INSERT INTO levels (name, programId) VALUES (?, ?)",
            [level, addedProgram.insertId]
          );
        });
      });
    });
  });
};

buildStructure();
