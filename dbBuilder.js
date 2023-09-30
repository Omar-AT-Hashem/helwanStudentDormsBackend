import conn from "./config/db.js";

// await conn.awaitQuery(
//   "CREATE TABLE employees (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) , username VARCHAR(100), password VARCHAR(100));"
// );

// await conn.awaitQuery(
//   "CREATE TABLE buildings (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) );"
// );

// await conn.awaitQuery(
//   "CREATE TABLE floors (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, number INT, buildingId INT , FOREIGN KEY (buildingId) REFERENCES buildings(id) ON DELETE CASCADE);"
// );

// await conn.awaitQuery(
//   "CREATE TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) , image VARCHAR(255), nationalId VARCHAR(50) , fileNumber VARCHAR(80) , studentCode VARCHAR(255) , religion VARCHAR(50) , email VARCHAR(120) , telephone VARCHAR(50) , mobile VARCHAR(50) , fatherName VARCHAR(120) , fatherOccupation VARCHAR(120) , fatherNationalId VARCHAR(50) , fatherPhone VARCHAR(50) , guardianName VARCHAR(120) , guardianNationalId VARCHAR(50) ,  guardianRelationShip VARCHAR(80) , placeOfResidency VARCHAR(120) , address VARCHAR(255) , faculty VARCHAR(150) , gradeAssessment VARCHAR(120), gradePercentage VARCHAR(20), accomodationType VARCHAR(100), familyAbroad INT , acceptanceStatus INT , accomodationWithNutrition INT, addressDetails VARCHAR(255), dateOfApplying VARCHAR(255), password VARCHAR(255), isDisabled INT );"
// );

await conn.awaitQuery(
  "CREATE TABLE instructions (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, instruction VARCHAR(400));"
);
await conn.awaitQuery(
  "CREATE TABLE applicationdates (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, dates VARCHAR(400));"
);

// await conn.awaitQuery(
//   `INSERT INTO students (name, image, nationalId, fileNumber, studentCode, religion, email, telephone, mobile, fatherName, fatherOccupation, fatherNationalId, fatherPhone, guardianName, guardianNationalId, guardianRelationShip, placeOfResidency, address, faculty, gradeAssessment, gradePercentage, accomodationType, familyAbroad, acceptanceStatus, accomodationWithNutrition) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//   [
//     "John Doe",
//     "dummy.jpg",
//     "1234567890",
//     "F12345",
//     "S987654",
//     "Christian",
//     "john.doe@example.com",
//     "555-123-4567",
//     "555-987-6543",
//     "James Doe",
//     "Engineer",
//     "0987654321",
//     "555-789-1234",
//     "Jane Smith",
//     "0123456789",
//     "Mother",
//     "123 Main St",
//     "Apt 456",
//     "Engineering",
//     "A+",
//     "95.5",
//     "On-Campus",
//     0,
//     1,
//     1,
//   ]
// );

// await conn.awaitQuery(
//   `INSERT INTO students (name, image, nationalId, fileNumber, studentCode, religion, email, telephone, mobile, fatherName, fatherOccupation, fatherNationalId, fatherPhone, guardianName, guardianNationalId, guardianRelationShip, placeOfResidency, address, faculty, gradeAssessment, gradePercentage, accomodationType, familyAbroad, acceptanceStatus, accomodationWithNutrition) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//   [
//     "Another Student",
//     "another_dummy.jpg",
//     "9876543210",
//     "F54321",
//     "S987123",
//     "Buddhist",
//     "another.student@example.com",
//     "555-555-5555",
//     "555-123-9876",
//     "Michael Smith",
//     "Doctor",
//     "1234567890",
//     "555-555-1234",
//     "Lisa Johnson",
//     "9876543210",
//     "Aunt",
//     "456 Elm St",
//     "Apt 789",
//     "Science",
//     "B-",
//     "75.0",
//     "Off-Campus",
//     1,
//     0,
//     0,
//   ]
// );

process.exit(0);
