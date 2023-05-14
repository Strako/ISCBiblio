-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 13-05-2023 a las 19:31:54
-- Versión del servidor: 8.0.33-0ubuntu0.22.04.1
-- Versión de PHP: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ISCBiblio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `admin_id` int NOT NULL,
  `mail` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`admin_id`, `mail`, `password`, `role`) VALUES
(1, 'retro@gmail.com', '1234567', 'admin'),
(2, 'fausto@gmail.com', '1234567', 'admin'),
(4, 'strako@gmail.com', '1234567', 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `book_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`book_id`, `title`, `author`, `quantity`) VALUES
(1, 'La trilogia de nueva york', 'Paul auster', 10),
(2, 'Ciudades de cristal', 'Paul auster', 21),
(3, 'Leviatan', 'Paul auster', 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `borrows`
--

CREATE TABLE `borrows` (
  `borrow_id` int NOT NULL,
  `admin_id` int NOT NULL,
  `borrow_date` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `return_date` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `book_id` int NOT NULL,
  `member_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `borrows`
--
DELIMITER $$
CREATE TRIGGER `decrement_quantity` AFTER INSERT ON `borrows` FOR EACH ROW UPDATE books SET books.quantity = books.quantity - 1 WHERE book_id = new.book_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `increment_quantity` AFTER UPDATE ON `borrows` FOR EACH ROW UPDATE books SET books.quantity = books.quantity + 1 WHERE book_id = new.book_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `logUpd` AFTER UPDATE ON `borrows` FOR EACH ROW BEGIN
    DECLARE log_text VARCHAR(255);
    SET log_text = CONCAT('Se actualizo a: admin_id=', NEW.admin_id, ', borrow_date=', NEW.borrow_date, ', return_date=', NEW.return_date, ', book_id=', NEW.book_id, ', member_id=', NEW.member_id);
    INSERT INTO logs (log) VALUES (log_text);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `logs` AFTER INSERT ON `borrows` FOR EACH ROW BEGIN
    DECLARE log_text VARCHAR(255);
    SET log_text = CONCAT('Se insertó: admin_id=', NEW.admin_id, ', borrow_date=', NEW.borrow_date, ', return_date=', NEW.return_date, ', book_id=', NEW.book_id, ', member_id=', NEW.member_id);
    INSERT INTO logs (log) VALUES (log_text);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `logsDel` AFTER DELETE ON `borrows` FOR EACH ROW BEGIN
    DECLARE log_text VARCHAR(255);
    SET log_text = CONCAT('Se elimino: admin_id=', OLD.admin_id, ', borrow_date=', OLD.borrow_date, ', return_date=', OLD.return_date, ', book_id=', OLD.book_id, ', member_id=', OLD.member_id);
    INSERT INTO logs (log) VALUES (log_text);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

CREATE TABLE `logs` (
  `log_id` int NOT NULL,
  `log` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`log_id`, `log`) VALUES
(1, 'Se insertó: admin_id=3, borrow_date=2020-10-10, return_date=, book_id=3, member_id=1'),
(2, 'Se elimino: admin_id=3, borrow_date=2020-10-10, return_date=, book_id=3, member_id=1'),
(3, 'Se actualizo a: admin_id=3, borrow_date=2020-10-10, return_date=, book_id=2, member_id=1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `members`
--

CREATE TABLE `members` (
  `member_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(13) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `members`
--

INSERT INTO `members` (`member_id`, `name`, `address`, `phone`) VALUES
(1, 'Armando', 'Calle 1 #123', '4445732039'),
(2, 'edit', 'edit 123', '+520000000010');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `admin_id` (`admin_id`);

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);

--
-- Indices de la tabla `borrows`
--
ALTER TABLE `borrows`
  ADD PRIMARY KEY (`borrow_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indices de la tabla `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `borrows`
--
ALTER TABLE `borrows`
  MODIFY `borrow_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `borrows`
--
ALTER TABLE `borrows`
  ADD CONSTRAINT `FK_AdminID` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_BookID` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_MemberID` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
