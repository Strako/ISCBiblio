CREATE DATABASE ISCBiblio;
USE ISCBiblio;

DROP TABLE IF EXISTS `Admins`;
CREATE TABLE `Admins` (
  `AdminID` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `Mail` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(20) NOT NULL,
  CONSTRAINT `PK_AdminID` PRIMARY KEY (`AdminID`)
);

DROP TABLE IF EXISTS `Books`;
CREATE TABLE `Books` (
  `BookID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Author` varchar(255) NOT NULL,
  `Quantity` int(11) NOT NULL,
  CONSTRAINT `PK_BookID` PRIMARY KEY (`BookID`)
);

DROP TABLE IF EXISTS `Members`;
CREATE TABLE `Members` (
  `MemberID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Phone` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`MemberID`),
  UNIQUE KEY `ClientID` (`MemberID`)
);

DROP TABLE IF EXISTS `Borrows`;
CREATE TABLE `Borrows` (
  `BorrowID` int(11) NOT NULL AUTO_INCREMENT,
  `AdminID` int(11) NOT NULL,
  `BorrowDate` varchar(10) NOT NULL,
  `ReturnDate` varchar(10) DEFAULT NULL,
  `BookID` int(11) NOT NULL,
  `MemberID` int(11) NOT NULL,
  CONSTRAINT `PK_BookID` PRIMARY KEY (`BorrowID`),
  INDEX (`BookID`),
  CONSTRAINT `FK_BookID` FOREIGN KEY (`BookID`) REFERENCES `Books` (`BookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX (`MemberID`),
  CONSTRAINT `FK_MemberID` FOREIGN KEY (`MemberID`) REFERENCES `Members` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX (`AdminID`),
  CONSTRAINT `FK_AdminID` FOREIGN KEY (`AdminID`) REFERENCES `Admins` (`AdminID`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Logs`;
CREATE TABLE `Logs` (
  `LogID` int(11) NOT NULL AUTO_INCREMENT,
  `Log` varchar(255) DEFAULT NULL,
  UNIQUE KEY `LogID` (`LogID`)
);

