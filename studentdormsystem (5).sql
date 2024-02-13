-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2024 at 04:28 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentdormsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicationdates`
--

CREATE TABLE `applicationdates` (
  `id` int(11) NOT NULL,
  `studentType` varchar(50) DEFAULT NULL,
  `startDate` varchar(100) DEFAULT NULL,
  `endDate` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicationdates`
--

INSERT INTO `applicationdates` (`id`, `studentType`, `startDate`, `endDate`) VALUES
(13, 'fdsdfs', '2023-10-11', '2023-11-03'),
(14, '66887', '2024-01-11', '2024-01-16'),
(15, 'new', '2024-01-17', '2024-01-16'),
(18, 'sdklajhfjklash', '2024-01-30', '2024-02-08');

-- --------------------------------------------------------

--
-- Table structure for table `beds`
--

CREATE TABLE `beds` (
  `id` int(11) NOT NULL,
  `number` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  `isOccupied` int(11) DEFAULT NULL,
  `occupant` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beds`
--

INSERT INTO `beds` (`id`, `number`, `roomId`, `isOccupied`, `occupant`) VALUES
(1, 1, 1, 0, NULL),
(3, 3, 1, 0, NULL),
(5, 5, 2, 1, 3),
(10, 88, 11, 0, NULL),
(11, 89, 10, 0, NULL),
(18, 4, 1, 0, NULL),
(48, 46546, 1, 0, NULL),
(50, 123, 39, 0, NULL),
(51, 45, 29, 0, NULL),
(52, 444, 7, 0, NULL),
(53, 66, 9, 1, 8),
(55, 456, 29, 0, NULL),
(56, 44, 29, 0, NULL),
(57, 4654, 33, 0, NULL),
(58, 456, 33, 0, NULL),
(59, 35345, 29, 0, NULL),
(60, 234243, 41, 0, NULL),
(61, 334, 41, 0, NULL),
(62, 2324, 40, 0, NULL),
(63, 324, 40, 0, NULL),
(64, 53543, 9, 0, NULL),
(68, 343534, 2, 0, NULL),
(71, 32342, 2, 1, 7),
(72, 3243, 2, 0, NULL),
(76, 34, 1, 0, NULL),
(81, 33, 44, 0, NULL),
(82, 334, 44, 0, NULL),
(83, 65, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blockmeals`
--

CREATE TABLE `blockmeals` (
  `id` int(11) NOT NULL,
  `fromDate` varchar(100) DEFAULT NULL,
  `toDate` varchar(100) DEFAULT NULL,
  `meal` varchar(100) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blockmeals`
--

INSERT INTO `blockmeals` (`id`, `fromDate`, `toDate`, `meal`, `reason`, `studentId`) VALUES
(3, '2024-01-03', '2024-01-09', 'lunch', 'mosha8eb', 1);

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `townId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`id`, `name`, `type`, `townId`) VALUES
(1, 'building 1', 'M', 1),
(2, 'building 2', 'M', 1),
(3, 'building 1', 'F', 3),
(4, 'building 2', 'M', 3),
(11, 'building 3', 'F', 1),
(13, 'aa', 'M', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `governorate` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `governorate`) VALUES
(4, 'dfgdfgdfg', 'الزقازيق'),
(5, 'fgdfg', 'الإسماعيلية'),
(9, '786786876', 'أسوان');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `username`, `password`) VALUES
(1, 'omar', 'omar1', '$2b$10$mm1a.2gmFmQAuLb.wmyNieTHdl6QJ7f09B0FwWdbvfRzMGKKsLsjC');

-- --------------------------------------------------------

--
-- Table structure for table `fees`
--

CREATE TABLE `fees` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `necessaryForNutrition` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fees`
--

INSERT INTO `fees` (`id`, `name`, `necessaryForNutrition`) VALUES
(1, 'new1', 'yes'),
(2, 'new2', 'no'),
(7, 'adsasd', 'no'),
(8, 'saasaserr', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `floors`
--

CREATE TABLE `floors` (
  `id` int(11) NOT NULL,
  `number` int(11) DEFAULT NULL,
  `buildingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `floors`
--

INSERT INTO `floors` (`id`, `number`, `buildingId`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 2, 2),
(5, 1, 4),
(6, 1, 3),
(7, 11, 3),
(8, 10, 3),
(9, 3, 1),
(21, 1, 11),
(22, 3, 11);

-- --------------------------------------------------------

--
-- Table structure for table `instructions`
--

CREATE TABLE `instructions` (
  `id` int(11) NOT NULL,
  `instruction` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructions`
--

INSERT INTO `instructions` (`id`, `instruction`) VALUES
(84, 'sfasdfasdfas'),
(85, 'asdfasdfafsdasdfafsd'),
(86, 'asdfasdfafsasefasasasaaaaaaaaaaaaa'),
(88, 'asdasdfadfssdss'),
(90, '11adadsa'),
(93, 'aaasasasasasaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsa'),
(94, 'sdasdadssdad'),
(95, 'gfdfg'),
(97, '12');

-- --------------------------------------------------------

--
-- Table structure for table `penalties`
--

CREATE TABLE `penalties` (
  `id` int(11) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `date` varchar(30) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penalties`
--

INSERT INTO `penalties` (`id`, `type`, `reason`, `date`, `studentId`) VALUES
(1, 'option2', 'dasda', '2023-12-13', 3),
(2, 'option3', 'penalty 27897', '2023-12-14', 3),
(3, 'option3', 'sdadsa', '2023-12-05', 3),
(4, 'option1', 'naughty', '2023-11-30', 1),
(5, 'option3', 'mamta7ansh', '2023-11-16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `number` int(11) DEFAULT NULL,
  `type` varchar(40) NOT NULL,
  `floorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `number`, `type`, `floorId`) VALUES
(1, 1, 'سكن عادي', 1),
(2, 2, 'سكن عادي', 1),
(7, 7, 'سكن عادي', 3),
(8, 8, 'سكن عادي', 3),
(9, 9, 'سكن عادي', 4),
(10, 99, 'سكن عادي', 6),
(11, 100, 'سكن عادي', 5),
(29, 1, 'سكن عادي', 2),
(33, 2, 'سكن عادي', 2),
(39, 4, 'سكن عادي', 1),
(40, 43, 'سكن عادي', 1),
(41, 234, 'سكن عادي', 1),
(44, 1, 'سكن عادي', 21),
(45, 224, 'سكن عادي', 21),
(48, 576, 'سكن مميز', 1),
(51, 33, 'سكن عادي', 1);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `nationalId` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `birthday` varchar(30) DEFAULT NULL,
  `age` int(11) NOT NULL,
  `distance` float NOT NULL,
  `dateOfApplying` varchar(30) DEFAULT NULL,
  `placeOfBirth` varchar(100) DEFAULT NULL,
  `image` varchar(400) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `faculty` varchar(100) DEFAULT NULL,
  `fatherName` varchar(100) DEFAULT NULL,
  `fatherNationalId` varchar(20) DEFAULT NULL,
  `fatherOccupation` varchar(100) DEFAULT NULL,
  `fatherNumber` varchar(20) DEFAULT NULL,
  `guardianName` varchar(100) DEFAULT NULL,
  `guardianNationalId` varchar(20) DEFAULT NULL,
  `guardianRelationship` varchar(50) DEFAULT NULL,
  `residence` varchar(100) DEFAULT NULL,
  `addressDetails` varchar(1000) DEFAULT NULL,
  `isDisabled` int(11) DEFAULT NULL,
  `familyAbroad` int(11) DEFAULT NULL,
  `highschoolAbroad` int(11) DEFAULT NULL,
  `highschoolSpecialization` varchar(100) DEFAULT NULL,
  `academicYear` int(11) NOT NULL,
  `grade` varchar(10) DEFAULT NULL,
  `accomodationType` varchar(50) DEFAULT NULL,
  `accomodationWithNutrition` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `isNew` int(11) DEFAULT NULL,
  `isApproved` int(11) DEFAULT NULL,
  `isAccepted` int(11) DEFAULT NULL,
  `isHoused` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `nationalId`, `name`, `birthday`, `age`, `distance`, `dateOfApplying`, `placeOfBirth`, `image`, `gender`, `telephone`, `mobile`, `email`, `religion`, `faculty`, `fatherName`, `fatherNationalId`, `fatherOccupation`, `fatherNumber`, `guardianName`, `guardianNationalId`, `guardianRelationship`, `residence`, `addressDetails`, `isDisabled`, `familyAbroad`, `highschoolAbroad`, `highschoolSpecialization`, `academicYear`, `grade`, `accomodationType`, `accomodationWithNutrition`, `password`, `username`, `isNew`, `isApproved`, `isAccepted`, `isHoused`) VALUES
(1, '123', 'omar22', '2023-11-09', 21, 210, '2023-11-21', 'sdasdasd', '/default-photo.jpg', 'M', 'asdasa', 'asdasda', 'sdadsasd@4343', 'مسلم', 'sdasda', 'sdasda', 'sfasfda', 'fgdghdhf', 'sdasda', 'fgdfgd', 'fgdg', 'sdadsa', 'sdasda', 'asdasda', 0, 1, 0, 'علمى علوم', 1, '20', 'سكن مميز', 0, '$2b$10$gXT/HtDIRTtnR4pu3QWmMe.ufbeXKX8J2AMvhfe0zGiMC6.ZqpYB2', '123', 0, 1, 1, 0),
(2, '1234', 'adel', '2023-09-19', 18, 540, '2023-11-21', 'gfdgfd', NULL, 'M', 'fghdfghd', 'fgdfgfgdfgd', 'hfgdghfdghfdz3gfdftgdfg@fsdtfgdgdfgg', 'مسيحى', 'fghdfghd', 'hfgdfghd', 'dfghdfghd', 'hgdfghdfhg', 'dfgsgfdsdfgs', 'hdhfdf', 'fdhfd', 'fghdhfgdhd', 'fgdghfdfghdhfgdfgh', 'fghdhgfzd', 0, 0, 1, 'أزهرى أدبى', 0, '200', 'سكن عادي', 0, '$2b$10$vp8IFqfumpwS/IWc1v9Yy.FbHN.VuXXG54M1Czz3i9l56nij6g.hW', '1234', 1, 1, 0, 0),
(3, '12345', 'testname', '2023-11-10', 19, 332, '2023-11-22', 'edrsfgdsdfgs', '/me1701095641268.png', 'M', 'dfsdfsdfgs', 'sdfsdfsdfgds', 'dfgsgdfs', 'مسيحى', 'dfgsgdfs', 'dfsdfsdfgs', 'dfgsdfgsdfgsdfg', 'dfgdfgsdfgs', 'dfsdfgsdfgsdfg', 'dfsdfgsdfgs', 'dfsdfsdfs', 'dfsdfgsdfg', 'dfgsgdfs', 'dfgsdgfsgf', 0, 1, 1, 'علمى رياضة', 1, '45', 'سكن عادي', 0, '$2b$10$kdtZ6hG9Tzc3mdT3qgAqbeLIAiT9hWeFDoLVdjqHbEonfqjIbvvBy', '12345', 0, 1, 1, 1),
(4, '1234566', 'dfgfgdfg', '2023-11-14', 20, 1001, '2023-11-26', 'dfsgdfsdfgs', NULL, 'F', 'dfgsdfgsgdfs', 'sgfsgdfsgfds', 'sdfgssdfgsgdfsgfds', 'مسلم', 'sgfdsgfds', 'fgdsgfdsgfd', 'sdfgsgdfsgdfs', 'dfgsdfgs', 'sdfgsdfgsdfg', 'dfgsgdfs', 'dfgsgdfs', 'dfgsdfgs', 'gfdgfdfg', 'fgdsfghd', 1, 1, 0, 'أزهرى علمى', 3, '20', 'سكن عادي', 1, '$2b$10$dPEAevq4eymdsyNTNOuTN.mzSy2PSadsK.Ae7FJcq//SolI0WRgsS', '1234566', 0, 0, 0, 0),
(5, '111', 'gesdgsgdfsddf', '2024-01-17', 25, 1000, '2024-1-6', 'dgsgfdsdgf', NULL, 'M', '35435434', '56465445', 'sffd@sfdgsfgd', 'مسلم', 'sesesesesafdasdf', 'sdasdfasdfa', '42342342', 'asdafdsadfs', '54654', 'sdafdsasdfa', '342432342', 'asfdsasdfa', 'asasa', 'yuuytgjhg8-ghfhgfghg', 0, 0, 0, 'أدبى', 0, '333', 'سكن عادي', 0, '$2b$10$L2tFFr8z1xpgFdIADtsEYuU.Qfsg3dNMu7rSgNULp8W6qTfK0aVFu', '111', 1, 1, 1, 0),
(6, '112222', 'ersfdgsdfgs', '2002-03-21', 19, 20, '2024-1-6', 'fasdfasdfa', NULL, 'F', 'sfdsdfsdfs', 'sdfasda', 'dfgsfd@fsdfsdf', 'مسلم', 'dfsdfsdfs', 'sddfgsgdfsdfg', 'dfgsdfgsdfgsdf', 'dfgsdfgsdfgs', 'sdfasdfasdfa', 'sdfgsdfgs', 'dfgsgdfsdfg', 'sdaasdfasdf', 'dfgsdfgsdfgs', 'dsdfgsdfgsdfg', 1, 0, 1, 'أزهرى علمى', 0, '3.7', 'سكن عادي', 0, '$2b$10$Txdra3FdagBe3RMOkdvkVeu7NLDpN3TAjh0cmWcEhe2NH/qES6MKq', '112222', 1, 0, 0, 0),
(7, '435434535', 'fdsdfsdfs', '2003-03-21', 33, 110, '2024-1-6', 'dfsdfsdfsf', NULL, 'M', 'dfsfdsdfs', 'sdfasdfafs', 'dfsdfsdf@fdsdfsdf', 'مسيحى', 'fdsdfsdfs', 'dfsdfsdfs', 'dfsdfsdfs', 'dfsdfgsgdfs', 'sfafsdasdf', 'gdsdfgsdfg', 'dfsdfsdfs', 'fsaasdfasdf', 'dfsdfsfdsfd', 'dfsdfsf', 1, 0, 0, 'أدبى', 0, '456', 'سكن عادي', 1, '$2b$10$yzcfZlrkH2r5hRDgvKGSRO/WMXbkpbgpeULvt.iCNmEhsVWvj/bse', '435434535', 1, 1, 1, 1),
(8, '111231453543', 'fsdfsfd', '1996-05-07', 27, 11.1611, '2024-1-6', 'wdasdads', NULL, 'F', 'sdasdasda', 'asdasd', 'dsasdasdasd', 'مسلم', 'sasdasda', 'sdasdasdas', 'adsasda', 'sdasdasdasd', 'dsasda', 'asdasdasd', 'asdasdaasd', 'sdasda', 'sasdasda', 'sasasda', 0, 1, 0, 'معاهد فنية ثلاث سنوات', 4, '45', 'سكن عادي', 0, '$2b$10$cCc7BCQy2zIyQJ.ltqymJetohWzYpngkYtyGuckTuNTmuE.jYLhy2', '111231453543', 0, 1, 1, 1),
(9, '444444', 'esfgdsdgfs', '1990-01-09', 34, 13.4478, '2024-1-9', 'dsdfgsdfgs', NULL, 'M', 'dfsdfgsdfgsfd', 'dfgsdfgsdfgs', 'sdfgsdfgsdfgs', 'مسلم', 'dfgsdfgsdfgsg', 'dfgsfgsgds', '2353543543', 'gdsdgfsgdfs', 'dsfdgsdfgs', 'sfdsgsdfgsg', '34353453', 'dsdfgsdgfsdfg', 'fddfsdfgsg', 'dfsgddfsgdfsdfg', 0, 1, 0, 'أزهرى علمى', 4, '2.76', 'سكن عادي', 1, '$2b$10$.IPUPFmBDpm7ib0eSZkVROQWy3UngcPZX8nUBKBR727MuwlHQqTyi', '444444', 0, 1, 0, 0),
(10, 'asdfasdfa', 'sdfasdfasdfasf', '2024-02-22', -1, 12.8767, '2024-2-13', 'sdfadfsasd', NULL, 'F', 'sdafdsasdfa', 'asdfasfda', 'asdfafds', 'مسلم', 'sdfasdfa', 'fdsasdfa', 'dasdfafsda', 'sdasdfa', 'sdfasdfaf', 'sdfadfsasdf', 'saassdfasfd', 'sdafsdasfeda', 'saasasdf', 'sdsdasdasdf', 1, 1, 1, 'معاهد فنية ثلاث سنوات', 2, '45', 'سكن عادي', 1, '$2b$10$B.XXdgAX9f5Hb29irOub/eUjqVCxsJfMIazgj3BfYEIR6aZhreC2W', 'asdfasdfa', 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `towns`
--

CREATE TABLE `towns` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `towns`
--

INSERT INTO `towns` (`id`, `name`) VALUES
(1, 'town 1'),
(3, 'town 2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicationdates`
--
ALTER TABLE `applicationdates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beds`
--
ALTER TABLE `beds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomId` (`roomId`);

--
-- Indexes for table `blockmeals`
--
ALTER TABLE `blockmeals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentId` (`studentId`);

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `townId` (`townId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fees`
--
ALTER TABLE `fees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `floors`
--
ALTER TABLE `floors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buildingId` (`buildingId`);

--
-- Indexes for table `instructions`
--
ALTER TABLE `instructions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penalties`
--
ALTER TABLE `penalties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentId` (`studentId`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `floorId` (`floorId`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `towns`
--
ALTER TABLE `towns`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicationdates`
--
ALTER TABLE `applicationdates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `beds`
--
ALTER TABLE `beds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `blockmeals`
--
ALTER TABLE `blockmeals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fees`
--
ALTER TABLE `fees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `floors`
--
ALTER TABLE `floors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `instructions`
--
ALTER TABLE `instructions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `penalties`
--
ALTER TABLE `penalties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `towns`
--
ALTER TABLE `towns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `beds`
--
ALTER TABLE `beds`
  ADD CONSTRAINT `beds_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blockmeals`
--
ALTER TABLE `blockmeals`
  ADD CONSTRAINT `blockmeals_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `buildings`
--
ALTER TABLE `buildings`
  ADD CONSTRAINT `buildings_ibfk_1` FOREIGN KEY (`townId`) REFERENCES `towns` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `floors`
--
ALTER TABLE `floors`
  ADD CONSTRAINT `floors_ibfk_1` FOREIGN KEY (`buildingId`) REFERENCES `buildings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penalties`
--
ALTER TABLE `penalties`
  ADD CONSTRAINT `penalties_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`floorId`) REFERENCES `floors` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
