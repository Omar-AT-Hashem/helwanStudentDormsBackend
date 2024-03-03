import conn from "./config/db.js";

await conn.awaitQuery(
  "CREATE TABLE employees (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) , username VARCHAR(100), password VARCHAR(100), creating INT, deleting INT, reading INT, updating INT, creatingEmployee INT,);"
);

await conn.awaitQuery(
  "CREATE TABLE towns (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) );"
);

await conn.awaitQuery(
  "CREATE TABLE buildings (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), type VARCHAR(10), townId INT , FOREIGN KEY (townId) REFERENCES towns(id) ON DELETE CASCADE);"
);

await conn.awaitQuery(
  "CREATE TABLE floors (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, number INT, buildingId INT , FOREIGN KEY (buildingId) REFERENCES buildings(id) ON DELETE CASCADE);"
);

await conn.awaitQuery(
  "CREATE TABLE rooms (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, number INT, type VARCHAR(40), floorId INT , FOREIGN KEY (floorId) REFERENCES floors(id) ON DELETE CASCADE);"
);

await conn.awaitQuery(
  "CREATE TABLE beds (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, number INT, roomId INT, isOccupied INT, occupant INT, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE);"
);

await conn.awaitQuery(
  "CREATE TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, nationalId VARCHAR(20), name VARCHAR(100), birthday VARCHAR(30), age INT, distance FLOAT, dateOfApplying VARCHAR(30)  ,placeOfBirth VARCHAR(100),image VARCHAR(400) , gender VARCHAR(10), telephone VARCHAR(20), mobile VARCHAR(20), email VARCHAR(100), religion VARCHAR(50), faculty VARCHAR(100), fatherName VARCHAR(100), fatherNationalId VARCHAR(20), fatherOccupation VARCHAR(100), fatherNumber VARCHAR(20), guardianName VARCHAR(100), guardianNationalId VARCHAR(20), guardianRelationship VARCHAR(50), residence VARCHAR(100), addressDetails VARCHAR(1000), isDisabled INT, familyAbroad INT, highschoolAbroad INT, highschoolSpecialization VARCHAR(100), academicYear INT, grade VARCHAR(10), accomodationType VARCHAR(50), accomodationWithNutrition INT, password VARCHAR(255), username VARCHAR(100),isNew INT, isApproved INT, isAccepted INT, isHoused INT);"
);

await conn.awaitQuery(
  "CREATE TABLE instructions (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, instruction VARCHAR(400));"
);

await conn.awaitQuery(
  "CREATE TABLE applicationdates (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, studentType VARCHAR(50), startDate VARCHAR(100), endDate VARCHAR(100));"
);

await conn.awaitQuery(
  "CREATE TABLE categories (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), governorate VARCHAR(100));"
);

await conn.awaitQuery(
  "CREATE TABLE penalties (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, type VARCHAR(100), reason VARCHAR(200) ,date VARCHAR(30) , studentId INT ,FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE);"
);

await conn.awaitQuery(
  "CREATE TABLE fees (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), necessaryForNutrition VARCHAR(10));"
);

await conn.awaitQuery(
  "CREATE TABLE studentfees (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, isPayed INT, type VARCHAR(50), sum FLOAT, date VARCHAR(50), studentId int ,FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE);"
);

await conn.awaitQuery(
  "CREATE TABLE logs (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, adminId INT, adminName VARCHAR(200), adminUsername VARCHAR(200), action VARCHAR(300), objectId VARCHAR(100), objectName VARCHAR(200), dateTime DATETIME);"
);

process.exit(0);
