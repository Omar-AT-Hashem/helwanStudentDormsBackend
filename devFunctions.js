import conn from "./config/db.js";

async function assignStudentSerialNumber() {
  let students = await conn.awaitQuery("SELECT * FROM students");

  students.forEach(async (student) => {
    let add = false;
    let randomNumber = Math.floor(1000000 + Math.random() * 9000000);

    let check = await conn.awaitQuery(
      "SELECT * FROM students WHERE serialNumber = ?",
      [randomNumber]
    );

    while (!add) {
      if (check.length > 0) {
        randomNumber = Math.floor(1000000 + Math.random() * 9000000);
        check = await conn.awaitQuery(
          "SELECT * FROM students WHERE serialNumber = ?",
          [randomNumber]
        );
      } else {
        add = true;
      }
    }

    if (add) {
      conn.awaitQuery("UPDATE students SET serialNumber = ? WHERE id = ?", [
        randomNumber,
        student.id,
      ]);
    }
  });
}

assignStudentSerialNumber();
