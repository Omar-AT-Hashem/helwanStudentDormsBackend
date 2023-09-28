import conn from "./config/db.js";

await conn.awaitQuery(
  "CREATE TABLE employees (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL, username VARCHAR(100), password VARCHAR(100));"
);

await conn.awaitQuery(
  "CREATE TABLE buildings (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL);"
);

await conn.awaitQuery(
  "CREATE TABLE floors (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, number INT, buildingId INT NOT NULL, FOREIGN KEY (buildingId) REFERENCES buildings(id) ON DELETE CASCADE);"
);

await conn.awaitQuery(
  "CREATE TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, image VARCHAR(255), nationalId VARCHAR(50) NOT NULL, fileNumber VARCHAR(80) NOT NULL, studentCode VARCHAR(255) NOT NULL, religion VARCHAR(50) NOT NULL, email VARCHAR(120) NOT NULL, telephone VARCHAR(50) NOT NULL, mobile VARCHAR(50) NOT NULL, fatherName VARCHAR(120) NOT NULL, fatherOccupation VARCHAR(120) NOT NULL, fatherNationalId VARCHAR(50) NOT NULL, fatherPhone VARCHAR(50) NOT NULL, guardianName VARCHAR(120) NOT NULL, guardianNationalId VARCHAR(50) NOT NULL,  guardianRelationShip VARCHAR(80) NOT NULL, placeOfResidency VARCHAR(120) NOT NULL, address VARCHAR(255) NOT NULL, faculty VARCHAR(150) NOT NULL, gradeAssessment VARCHAR(120), gradePercentage VARCHAR(20), accomodationType VARCHAR(100), familyAbroad INT NOT NULL, acceptanceStatus INT NOT NULL, accomodationWithNutrition INT NOT NULL);"
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
