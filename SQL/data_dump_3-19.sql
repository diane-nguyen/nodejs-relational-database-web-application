-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Mar 19, 2020 at 02:53 PM
-- Server version: 10.4.11-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_nguydian`
--

-- --------------------------------------------------------

--
-- Table structure for table `Artifacts`
--

CREATE TABLE `Artifacts` (
  `ArtifactID` int(11) NOT NULL,
  `FK_WingID` int(11) NOT NULL DEFAULT 0,
  `Name` varchar(255) NOT NULL,
  `ArtistOrOrigin` varchar(255) DEFAULT NULL,
  `Year` varchar(255) DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Artifacts`
--

INSERT INTO `Artifacts` (`ArtifactID`, `FK_WingID`, `Name`, `ArtistOrOrigin`, `Year`, `Price`) VALUES
(1, 5, 'Scale model of Imperial Rome', 'Interactive Display', NULL, NULL),
(2, 5, 'Edict on Maximum Price', 'Emperor Diocletian, Rome', '305 ACE', '17500'),
(3, 5, 'Roman Gold Coins', 'Roman Empire', '78 ACE', '5800'),
(4, 6, 'Young lover', 'Roman Empire', '130 ACE', '12500'),
(5, 6, 'Roman Dagger', 'Roman Empire', '22 ACE', '3500'),
(6, 7, 'The Roman Square', 'Publius Aelius Fortunatus', '122 ACE', '5500'),
(7, 7, 'Destruction of Pompeii', 'Publius Aelius Fortunatus', '130 ACE', '11600'),
(8, 7, 'Libertus', 'Publius Aelius Fortunatus', '129 ACE', '4500'),
(9, 8, 'Mummy of Serapis', 'The Malibu Painter', '78 ACE', '5500'),
(10, 8, 'Mummy of Isis', 'The Malibu Painter', '85 ACE', '1300'),
(11, 9, 'Painting of an Old Woman', 'Iaia', '100 ACE', '125500'),
(12, 9, 'Self Portrait', 'Iaia', '105 ACE', '50000'),
(13, 1, 'Saber Tooth Tiger Tooth', 'Prehistoric Earth', '5000 BCE', '12500'),
(14, 2, 'Skelteon of Angler Fish', 'Mariana Trench', '2017 ACE', '250'),
(15, 3, 'Moon Rocks', 'Apollo 11, NASA', '1969 ACE', '15550'),
(16, 4, 'Ancient Star Dust', 'Deep Space', '40000000 BCE', '3900000'),
(17, 14, 'Sunday in the Park', 'George', '1862', '82000'),
(18, 15, 'Santa Hat', 'The North Pole', '1992 ACE', '10');

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `EmployeeID` int(11) NOT NULL,
  `Fname` varchar(255) NOT NULL,
  `Lname` varchar(255) DEFAULT NULL,
  `Position` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`EmployeeID`, `Fname`, `Lname`, `Position`) VALUES
(1, 'John', 'Smith', 'Coordinator'),
(12, 'Bob', 'Smith', 'Coordinator'),
(13, 'Dwight', 'Schrute', 'Salesman');

-- --------------------------------------------------------

--
-- Table structure for table `Employee_Exhibits`
--

CREATE TABLE `Employee_Exhibits` (
  `ID` int(11) NOT NULL,
  `FK_EmployeeID` int(11) NOT NULL DEFAULT 0,
  `FK_WingID` int(11) NOT NULL DEFAULT 0,
  `NumberOfShifts` int(11) DEFAULT NULL,
  `Tours` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Exhibits`
--

CREATE TABLE `Exhibits` (
  `WingID` int(11) NOT NULL,
  `ExhibitName` varchar(255) NOT NULL,
  `WingName` varchar(255) DEFAULT NULL,
  `ThemeERA` varchar(255) DEFAULT NULL,
  `NumberOfPieces` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Exhibits`
--

INSERT INTO `Exhibits` (`WingID`, `ExhibitName`, `WingName`, `ThemeERA`, `NumberOfPieces`) VALUES
(1, 'Spring', 'North', NULL, NULL),
(2, 'Spring', 'East', NULL, NULL),
(3, 'Spring', 'South', NULL, NULL),
(4, 'Spring', 'West', NULL, NULL),
(5, 'Roman', 'North', NULL, NULL),
(6, 'Roman', 'East', NULL, NULL),
(7, 'Roman', 'South', NULL, NULL),
(8, 'Roman', 'West', NULL, NULL),
(9, 'Renaissance', 'North', NULL, NULL),
(10, 'Renaissance', 'East', NULL, NULL),
(11, 'Renaissance', 'South', NULL, NULL),
(12, 'Renaissance', 'West', NULL, NULL),
(14, 'Summer', 'West', 'Classic', 450),
(15, 'Winter', 'East', 'Winter Wonder Land', 200);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Artifacts`
--
ALTER TABLE `Artifacts`
  ADD PRIMARY KEY (`ArtifactID`),
  ADD KEY `Artifacts_ibfk_1` (`FK_WingID`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`EmployeeID`);

--
-- Indexes for table `Employee_Exhibits`
--
ALTER TABLE `Employee_Exhibits`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Employee_Exhibits_ibfk_1` (`FK_EmployeeID`),
  ADD KEY `Employee_Exhibits_ibfk_2` (`FK_WingID`);

--
-- Indexes for table `Exhibits`
--
ALTER TABLE `Exhibits`
  ADD PRIMARY KEY (`WingID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Artifacts`
--
ALTER TABLE `Artifacts`
  MODIFY `ArtifactID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Employee_Exhibits`
--
ALTER TABLE `Employee_Exhibits`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Exhibits`
--
ALTER TABLE `Exhibits`
  MODIFY `WingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Artifacts`
--
ALTER TABLE `Artifacts`
  ADD CONSTRAINT `Artifacts_ibfk_1` FOREIGN KEY (`FK_WingID`) REFERENCES `Exhibits` (`WingID`);

--
-- Constraints for table `Employee_Exhibits`
--
ALTER TABLE `Employee_Exhibits`
  ADD CONSTRAINT `Employee_Exhibits_ibfk_1` FOREIGN KEY (`FK_EmployeeID`) REFERENCES `Employees` (`EmployeeID`) ON DELETE CASCADE,
  ADD CONSTRAINT `Employee_Exhibits_ibfk_2` FOREIGN KEY (`FK_WingID`) REFERENCES `Exhibits` (`WingID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;