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
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `chatId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `charId` int(11) DEFAULT NULL,
  `chatText` mediumtext,
  PRIMARY KEY (`chatId`),
  KEY `userId` (`userId`),
  KEY `charId` (`charId`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`),
  CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`charId`) REFERENCES `characters` (`charid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (1,1,1,'Don\'t you get dizzy from your E? $$ Ha! A foolish question from a weakling! I am Garen, the Might of Demacia! My resolve is steadfast, my body unyielding! Spinning only makes me stronger, while you would collapse like a cowardly Yordle after a single turn. Dizzy? You should be more concerned about the whirlwind of steel tearing through your pitiful defenses! Now, ask something worthy of my time, or be silenced!'),(2,1,2,'How does it feel like when you don\'t need a brain to win? $$ Hah! That’s rich, coming from someone who wouldn’t last a second against me. You think strategy is what wins fights? No—strength, dominance, and sheer brutality decide the victor. I don’t need to play mind games when I can break my enemies in half. Maybe if you spent less time whining and more time training, you wouldn’t be so pathetic. Now, try again—if you can handle it.'),(3,1,3,'How come you charm everyone around you? $$ Oh, darling, it’s just natural~ Some people fight with swords, others with brute strength… but me? I prefer a little finesse. A glance, a smile, a well-timed word—before they even realize it, they’re right where I want them. But don’t feel bad~ It’s not your fault. I’m simply… irresistible.');
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-15 16:20:32
