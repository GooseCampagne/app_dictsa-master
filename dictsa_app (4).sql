-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2023 a las 05:43:35
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dictsa_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `id_asistencia` int(11) NOT NULL,
  `dia` varchar(20) NOT NULL,
  `fecha` varchar(50) NOT NULL,
  `nombre` text NOT NULL,
  `cod` varchar(10) DEFAULT NULL,
  `num` int(11) NOT NULL,
  `id_obra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`id_asistencia`, `dia`, `fecha`, `nombre`, `cod`, `num`, `id_obra`) VALUES
(1, 'LUNES', '28/09/2002', 'gus', '1', 2, 37),
(2, 'LUNES', '28/09/2002', 'Gustavo', '2', 2, 36),
(11, 'Martes', '28/09/2023', 'Gustavo', 'A', 12, 35),
(12, 'SABADO', '18/07/2023', 'Luis', 'AP', 2, 35),
(13, 'LUNES', '28/09/2002', 'Gustavo ', 'AT', 2, 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avances`
--

CREATE TABLE `avances` (
  `id_avance` int(11) NOT NULL,
  `id_obra` int(11) DEFAULT NULL,
  `dia_semana` varchar(20) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `resultados` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `horometro1` longblob DEFAULT NULL,
  `horometro2` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `avances`
--

INSERT INTO `avances` (`id_avance`, `id_obra`, `dia_semana`, `material`, `cantidad`, `resultados`, `observaciones`, `horometro1`, `horometro2`) VALUES
(69, 35, 'LUNES', 'Ladrillos', 200, 'Pared 20mts', 'Se hizo una pared de 20mts', NULL, NULL),
(70, 35, 'MARTES', 'Tubos de aluminio', 300, 'Dos cimientos levantados', 'Ya casi terminamos', NULL, NULL),
(71, 35, 'MIÉRCOLES ', 'Nada ', 0, 'Nada', '0', NULL, NULL),
(72, 35, 'MIÉRCOLES', 'Nada', 0, '0', '0', NULL, NULL),
(73, 35, 'MIERCOLES', 'Nada', 0, '0', '0', NULL, NULL),
(74, 35, 'JUEVES', 'nada otra cez', 12, '0', 'n/a', NULL, NULL),
(75, 36, 'LUNES', 'Ladrillos', 2020, 'Ocho paredes', 'Ya casi acabamos', NULL, NULL),
(81, 35, 'SÁBADO', 'Ladrillos', 10, 'Casi terminada', 'Ya casi', '', ''),
(85, 40, 'LUNES', 'Ladrillos', 200, 'Buenos', 'Malas', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE `incidencias` (
  `id_incidencia` int(11) NOT NULL,
  `obra` int(11) DEFAULT NULL,
  `workerid` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencias`
--

INSERT INTO `incidencias` (`id_incidencia`, `obra`, `workerid`) VALUES
(4, 35, 'user'),
(5, 37, 'i065');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras`
--

CREATE TABLE `obras` (
  `id_obra` int(11) NOT NULL,
  `codigo_obra` varchar(255) DEFAULT NULL,
  `nombre_obra` varchar(255) DEFAULT NULL,
  `encargado` varchar(255) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_cierre` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `obras`
--

INSERT INTO `obras` (`id_obra`, `codigo_obra`, `nombre_obra`, `encargado`, `fecha_inicio`, `fecha_cierre`, `status`) VALUES
(35, '123', 'AGUAS MUNICIPALES', 'user', '2002-09-28', '2002-09-29', 'ACTIVA'),
(36, 'obra-prueba', 'Obra de prueba', 'i065', '2002-09-27', '2002-09-29', 'ACTIVA'),
(37, '123', '123', 'admin', '2023-06-29', '2023-06-30', 'ACTIVA'),
(38, 'GGHHG', 'Prueba', 'user', '2023-09-08', '2023-09-09', 'ACTIVA'),
(39, 'Asssa', 'Gabo', 'i065', '2002-09-08', '2003-09-09', 'ACTIVA'),
(40, 'asddss', 'A7x', 'user', '2002-09-08', '2003-09-09', 'ACTIVA'),
(41, '123323', 'Aguas calientes', 'user', '2029-08-23', '2030-09-26', 'ACTIVA'),
(42, '7363', 'Gusgus', 'user', '2023-09-08', '2032-08-02', 'ACTIVA'),
(43, '123222', 'Guuuuzzz', 'i065', '2023-09-28', '2024-09-29', 'ACTIVA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `workerid` varchar(255) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido_paterno` varchar(255) DEFAULT NULL,
  `Apellido_materno` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `privilege` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`workerid`, `Nombre`, `Apellido_paterno`, `Apellido_materno`, `pass`, `privilege`) VALUES
('2213', 'Gustavo1', 'Campagne1', 'Carrasco1', '123', 'admin'),
('admin', 'Sebastian12prueba', 'Maya', 'Garcia', '123', 'admin'),
('i065', 'Irene', 'Leon', 'Quintana', 'i065', 'user'),
('rh', 'Blanca Janeth', 'Madril', 'Chavez', '123', 'rh'),
('user', 'Luis Eduardo', 'Ontiveros', 'Davila', '123', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `fk_asistencia_id_obra` (`id_obra`);

--
-- Indices de la tabla `avances`
--
ALTER TABLE `avances`
  ADD PRIMARY KEY (`id_avance`),
  ADD KEY `id_obra` (`id_obra`);

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`id_incidencia`),
  ADD KEY `obra` (`obra`),
  ADD KEY `residente` (`workerid`);

--
-- Indices de la tabla `obras`
--
ALTER TABLE `obras`
  ADD PRIMARY KEY (`id_obra`),
  ADD KEY `encargado` (`encargado`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`workerid`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `avances`
--
ALTER TABLE `avances`
  MODIFY `id_avance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `id_incidencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `obras`
--
ALTER TABLE `obras`
  MODIFY `id_obra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `fk_asistencia_id_obra` FOREIGN KEY (`id_obra`) REFERENCES `obras` (`id_obra`);

--
-- Filtros para la tabla `avances`
--
ALTER TABLE `avances`
  ADD CONSTRAINT `avances_ibfk_1` FOREIGN KEY (`id_obra`) REFERENCES `obras` (`id_obra`);

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD CONSTRAINT `incidencias_ibfk_1` FOREIGN KEY (`obra`) REFERENCES `obras` (`id_obra`),
  ADD CONSTRAINT `incidencias_ibfk_2` FOREIGN KEY (`workerid`) REFERENCES `users` (`workerid`);

--
-- Filtros para la tabla `obras`
--
ALTER TABLE `obras`
  ADD CONSTRAINT `obras_ibfk_1` FOREIGN KEY (`encargado`) REFERENCES `users` (`workerid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
