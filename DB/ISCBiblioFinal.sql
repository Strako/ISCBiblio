CREATE DATABASE ISCBiblio;
USE ISCBiblio;

DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  CONSTRAINT `PK_AdminID` PRIMARY KEY (`admin_id`)
);

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  CONSTRAINT `PK_BookID` PRIMARY KEY (`book_id`)
);

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  CONSTRAINT `PK_MEMBERID` PRIMARY KEY (`member_id`)
);

DROP TABLE IF EXISTS `borrows`;
CREATE TABLE `borrows` (
  `borrow_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `borrow_date` varchar(10) NOT NULL,
  `return_date` varchar(10) DEFAULT NULL,
  `book_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  CONSTRAINT `PK_BorrowID` PRIMARY KEY (`borrow_id`),
  INDEX (`book_id`),
  CONSTRAINT `FK_BookID` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX (`member_id`),
  CONSTRAINT `FK_MemberID` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX (`admin_id`),
  CONSTRAINT `FK_AdminID` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `log` varchar(255) DEFAULT NULL,
  CONSTRAINT `PK_LogID` PRIMARY KEY (`log_id`)
);

insert into admins (mail,password,role) VALUES('retro@gmail.com','1234567','admin');
insert into admins (mail,password,role) VALUES('fausto@gmail.com','1234567','admin');
insert into admins (mail,password,role) VALUES('strako@gmail.com','1234567','user');

