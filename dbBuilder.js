import conn from "./config/db.js";

// await conn.awaitQuery(
//   "CREATE TABLE employees (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) , username VARCHAR(100), password VARCHAR(100));"
// );

// await conn.awaitQuery(
//   "CREATE TABLE towns (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) );"
// );

// await conn.awaitQuery(
//   "CREATE TABLE buildings (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), townId INT , FOREIGN KEY (townId) REFERENCES towns(id) ON DELETE CASCADE);"
// );

// await conn.awaitQuery(
//   "CREATE TABLE floors (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, number INT, buildingId INT , FOREIGN KEY (buildingId) REFERENCES buildings(id) ON DELETE CASCADE);"
// );

// await conn.awaitQuery(
//   "CREATE TABLE rooms (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, number INT, floorId INT , FOREIGN KEY (floorId) REFERENCES floors(id) ON DELETE CASCADE);"
// );

// await conn.awaitQuery(
//   "CREATE TABLE beds (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, number INT, roomId INT, isOccupied INT, occupant INT, FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE);"
// );

// await conn.awaitQuery(
//   "CREATE TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, nationalId VARCHAR(20), name VARCHAR(100), birthday VARCHAR(30), dateOfApplying VARCHAR(30)  ,placeOfBirth VARCHAR(100),image VARCHAR(400) , gender VARCHAR(10), telephone VARCHAR(20), mobile VARCHAR(20), email VARCHAR(100), religion VARCHAR(50), faculty VARCHAR(100), fatherName VARCHAR(100), fatherNationalId VARCHAR(20), fatherOccupation VARCHAR(100), fatherNumber VARCHAR(20), guardianName VARCHAR(100), guardianNationalId VARCHAR(20), guardianRelationship VARCHAR(50), residence VARCHAR(100), addressDetails VARCHAR(1000), isDisabled INT, familyAbroad INT, highschoolAbroad INT, highschoolSpecialization VARCHAR(100), grade VARCHAR(10), accomodationType VARCHAR(50), accomodationWithNutrition INT, password VARCHAR(255), username VARCHAR(100), isApproved INT, isAccepted INT, isHoused INT);"
// );

// await conn.awaitQuery(
//   "CREATE TABLE instructions (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, instruction VARCHAR(400));"
// );

// await conn.awaitQuery(
//   "CREATE TABLE applicationdates (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, studentType VARCHAR(50), startDate VARCHAR(100), endDate VARCHAR(100));"
// );

// await conn.awaitQuery(
//   "CREATE TABLE categories (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), governorate VARCHAR(100));"
// );

process.exit(0);
