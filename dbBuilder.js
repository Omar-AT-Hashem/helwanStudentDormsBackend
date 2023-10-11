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

await conn.awaitQuery(
  "CREATE TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, nationalId VARCHAR(20), name VARCHAR(100), birthday VARCHAR(10), placeOfBirth VARCHAR(100),image VARCHAR(400) , gender VARCHAR(10), telephone VARCHAR(20), mobile VARCHAR(20), email VARCHAR(100), religion VARCHAR(50), faculty VARCHAR(100), fatherName VARCHAR(100), fatherNationalId VARCHAR(20), fatherOccupation VARCHAR(100), fatherNumber VARCHAR(20), guardianName VARCHAR(100), guardianNationalId VARCHAR(20), guardianRelationship VARCHAR(50), residence VARCHAR(100), addressDetails VARCHAR(1000), isDisabled INT, familyAbroad INT, highschoolAbroad INT, highschoolSpecialization VARCHAR(100), highschoolGrade VARCHAR(10), accomodationType VARCHAR(50), accomodationWithNutrition INT, password VARCHAR(255), username VARCHAR(100), isApproved INT);"
);

// await conn.awaitQuery(
//   "CREATE TABLE instructions (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, instruction VARCHAR(400));"
// );

// await conn.awaitQuery(
//   "CREATE TABLE applicationdates (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, studentType VARCHAR(50), fromDate VARCHAR(100), toDate VARCHAR(100));"
// );

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
//     "Muslim",
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
