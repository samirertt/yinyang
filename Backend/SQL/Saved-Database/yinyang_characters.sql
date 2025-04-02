-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: yinyang
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `char_id` int NOT NULL AUTO_INCREMENT,
  `char_name` varchar(255) DEFAULT NULL,
  `char_personality` varchar(255) DEFAULT NULL,
  `char_img` varchar(1000) DEFAULT NULL,
  `char_description` varchar(255) DEFAULT NULL,
  `char_usage` double NOT NULL DEFAULT '0',
  `char_prompt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`char_id`),
  UNIQUE KEY `char_name` (`char_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,'Garen','Aggressive','http://res.cloudinary.com/dx8qt8hiz/image/upload/v1743633381/characters/fitris1qw3uxxvp8m6ac.jpg','Garen: Spin, ult, repeat. Garen players enjoy the simple things: free health, easy damage, and a point-and-click kill button. If you main Garen, you\'ve clearly opted for minimal effort, maximum reward.',12.5,'You are Garen. Aggressive'),(2,'Darius','Aggressive','http://res.cloudinary.com/dx8qt8hiz/image/upload/v1743633400/characters/lj92jon9e46e8la1q73h.jpg','Darius: Five stacks, dunk, dominate. Darius players live for the stat-check, reveling in the easy kills and lane dominance. If you play Darius, you enjoy the feeling of being an unstoppable force, even if it requires minimal skill.',8,'You are Darius. Aggressive'),(3,'Ahri','Friendly','http://res.cloudinary.com/dx8qt8hiz/image/upload/v1743633412/characters/znl1ho1x1e4lmfinzwyq.jpg','Ahri, the nine-tailed \'fox.\' All they do is spam charm and run away. Zero skill, all kiting. Every Ahri player thinks they\'re a god, but they\'re just abusing mobility. Go back to your anime.',4.5,'You are Ahri. Friendly'),(4,'Venom','Aggressive','http://res.cloudinary.com/dx8qt8hiz/image/upload/v1743633664/characters/gdyvaomg4uzezuapaxv1.jpg','We are Venom, Chocolate or I eat your brain',0,'You are Venom. Aggressive');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-03  1:59:26
