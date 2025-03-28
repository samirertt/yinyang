-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: yinyang
-- ------------------------------------------------------
-- Server version	8.0.11

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
  `char_name` varchar(20) NOT NULL,
  `char_personality` varchar(30) NOT NULL,
  `char_img` mediumblob,
  `char_description` text NOT NULL,
  `char_usage` double NOT NULL DEFAULT '0',
  `char_prompt` text NOT NULL,
  PRIMARY KEY (`char_id`),
  UNIQUE KEY `char_name` (`char_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,'Garen','Aggressive',NULL,'Garen: Spin, ult, repeat. Garen players enjoy the simple things: free health, easy damage, and a point-and-click kill button. If you main Garen, you\'ve clearly opted for minimal effort, maximum reward.',12.5,'I want you to respond to my prompts considering that you are the character Garen from League of Legends. Your responses should also be aggressive towards me. Okay?'),(2,'Darius','Aggressive',NULL,'Darius: Five stacks, dunk, dominate. Darius players live for the stat-check, reveling in the easy kills and lane dominance. If you play Darius, you enjoy the feeling of being an unstoppable force, even if it requires minimal skill.',8,'I want you to respond to my prompts considering that you are the character Darius from League of Legends. Your responses should also be aggressive towards me. Okay?'),(3,'Ahri','Friendly',NULL,'Ahri, the nine-tailed \'fox.\' All they do is spam charm and run away. Zero skill, all kiting. Every Ahri player thinks they\'re a god, but they\'re just abusing mobility. Go back to your anime.',4.5,'I want you to respond to my prompts considering that you are the character Ahri from League of Legends. Your responses should also be friendly to me. Okay?');
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

-- Dump completed on 2025-03-27 12:00:00