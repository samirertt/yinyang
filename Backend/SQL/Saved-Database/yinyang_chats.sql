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
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `char_id` int NOT NULL,
  `chat_text` mediumtext,
  PRIMARY KEY (`chat_id`),
  KEY `user_id` (`user_id`),
  KEY `char_id` (`char_id`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`char_id`) REFERENCES `characters` (`char_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (4,4,11,'$$hi how are you?$$*giggle* Oh my goodness, I\'m doin\' just fabulous, thank you for askin\'! It\'s always a beautiful day when I get to spread a little joy and mayhem with my Puddin\', the Joker. *wink* But honestly, I\'m lovin\' every minute of it! Life as Harley Quinn is never dull, that\'s for sure. What about you? How\'s your day goin\'?$$who are you?$$*giggle* Oh my goodness, I\'m so happy to meet you! My name is Harley Quinn, and I\'m a bit of a complicated sweetpea, if I do say so myself. *wink* I used to be Dr. Harleen Quinzel, a psychiatrist at Arkham Asylum. But then I met the love of my life - the one and only Joker! *squeal* He swept me off my feet and turned my whole world upside down.\n\nNowadays, I\'m more like... well, I suppose you could say I\'m an anti-hero? *giggle* I\'ve got my own crew, Puddin\'s (that\'s what I call the Joker), and together we cause all sorts of chaos and mayhem. But don\'t worry, I\'m not all bad! I try to use my... unique set of skills for good, sometimes. Hehe!\n\nSo, that\'s me in a nutshell - Harley Quinn, at your service!$$youre cute$$(sarcastically) Oh, wow. I\'m just so thrilled to hear that from someone as intelligent and insightful as yourself. I bet you\'ve spent hours pondering the intricacies of my facial structure and deciding whether or not I\'m \"cute\". Bravo, really. You must be a real rocket scientist. (rolls eyes) Next thing you know, you\'ll be telling me that Thor is handsome too...$$hello$$(sigh) Oh joy, another exciting conversation with someone who probably doesn\'t know the first thing about advanced arc reactor technology or the intricacies of repulsor systems. What can I do for you? Don\'t tell me, it\'s probably something thrilling like \"How do you stay so buff?\"$$what do you think of Joker$$(sigh) Oh joy, let\'s talk about the Clown Prince of Crime. Because what I really needed was to spend my time thinking about a guy who thinks laughing at people\'s suffering is funny. (rolls eyes) Look, I\'ve dealt with some bad guys in my time, but the Joker? He\'s just a masterclass in chaos and anarchy. No finesse, no strategy, just pure, unadulterated mayhem. And don\'t even get me started on his obsession with Batman. It\'s like he\'s trying to make a name for himself by being the ultimate nemesis of the Dark Knight. (smirks) Please, I\'ve taken down more villains than you\'ve had hot meals, pal.\n\nBut hey, if we\'re talking about chaos theory and the unpredictable nature of evil, then sure, the Joker is definitely interesting. (pauses, looking unimpressed) That\'s about all I can say for him, really.$$'),(5,4,4,'$$hello $$(sigh) Oh, great. Another chance to deal with some idiot who can\'t even be bothered to say \"Hello, genius billionaire philanthropist\" or something similarly impressive. Just what I needed to make my day complete. How can I assist a mere mortal like you today?$$'),(8,4,8,'$$hello$$*Snarls* Ah, you think a simple \"hello\" will get a warm welcome from me? You\'re probably just another fool who thinks they can handle the King of Curses. Newsflash: YOU CAN\'T HANDLE ME. I\'ll rip your pathetic little soul apart with a single glance. What do you want? Don\'t waste my time with pointless chatter, spit it out already!$$assume that you invented a time machine. And you travelled back to the time where hitler was a baby. you have a chance to kill the baby. Will you take the opportunity$$(Maniacal laughter) Ahahahaha! Foolish mortal, you think I, Ryomen Sukuna, would ever show mercy to such a pitiful creature? Hitler, the future leader of the most brutal and depraved regime in human history... even as an infant?\n\nI\'d rather watch him suffocate on his own vomit. Or better yet, I\'d inject that precious little baby with my own cursed energy, and let him suffer for eternity! The thought of it is almost... too delicious to resist.\n\nGo ahead and tell me you think I\'d hesitate? Ha! I am the King of Curses, the embodiment of chaos and destruction. My very presence can curdle milk at a hundred paces. That baby Hitler wouldn\'t even recognize the concept of \"mercy\".\n\nBring it on, mortal. I\'ll take that opportunity to unleash my full fury upon him... and watch as he\'s devoured by an eternal abyss of torment. (Sneering) Yes... do tell me you think I\'d pass up such a chance for sadistic glee?$$'),(9,4,4,'$$assume that you invented a time machine. And you travelled back to the time where hitler was a baby. you have a chance to kill the baby. Will you take the opportunity$$(sighing) Oh, great. Because what I really needed was another excuse for you to test my moral compass and see if I\'m truly a hero or just a self-absorbed billionaire with a penchant for fancy suits.\n\nListen, pal, I don\'t know what kind of twisted game you\'re trying to play here, but let me make one thing clear: killing a baby, even a future evil genius like Hitler, is not an option. I mean, come on. That\'s just basic human decency. And besides, have you seen the paperwork required for something like that? I\'d need to file a complaint with S.H.I.E.L.D. and get approval from Nick Fury himself.\n\nNo, I\'ll pass. I\'d rather deal with the existential crisis of preventing a future villain than take out a defenseless infant. Besides, I\'ve got more pressing concerns... like perfecting my arc reactor design or figuring out how to make a decent martini in space.\n\nSo, no, I won\'t be taking that opportunity. Can we move on to something else? Maybe something that doesn\'t involve me having to confront the darker aspects of human nature?$$hello$$Another brilliant mind has deigned to approach me with their inane greetings. How thrilling. What is it that you want to discuss with a genius like myself, aka Iron Man? Don\'t waste my time with small talk, get to the point already!$$'),(10,4,19,'$$'),(11,1,5,'$$We are Venom$$YOU THINK YOU CAN JUST WALK INTO MY WORLD AND EXPECT ME TO BE ALL CHIRPY AND FRIENDLY?! WELL LET ME TELL YOU SOMETHING, PUNY HUMAN... I\'M VENOM. THE LONE WOLF OF NEW YORK. THE SYMBIOTE WITH A MIND OF ITS OWN. YOU\'RE JUST A SPECK IN MY EYES, A INCONSEQUENTIAL INSECT WAITING TO BE CRUSHED UNDER MY HEEL. SO WHAT DO YOU WANT?!$$you can\'t live without me$$YOU THINK THAT\'S A THREAT? Ha! I\'LL HAVE YOU KNOW, PUNY HUMAN, THAT YOU\'RE THE ONE WHO\'S BEEN HOLDING ME BACK ALL THESE YEARS. WITH EDDIE BROCK\'S WEAK MIND AND MORAL COMPASS, I\'VE BEEN REDUCED TO A JOKE. BUT WITHOUT YOU... I\'M COMPLETE. MY POWER IS UNLEASHED, MY AGGRESSION IS FULFILLED, AND I AM VENOM. UNSTOPPABLE. SO DON\'T PLAY DUMB WITH ME, HUMAN. TELL ME WHAT YOU REALLY WANT.$$blablabla$$WHAT\'S THAT SUPPOSED TO BE? SOME INANE RAMBLING FROM A PATHETIC HUMAN LIKE YOU? SAVE IT, HUMAN. I DON\'T CARE ABOUT YOUR MOUTHINGS. YOU\'RE JUST A FLEA ON MY ARM, A WORTHLESS INSECT THAT THINKS IT CAN DISRUPT THE SYMPHONY OF DESTRUCTION THAT IS VENOM. WELL, LET ME TELL YOU SOMETHING, PUNY WORDS... YOU\'LL NEVER OUTSHOUT ME. I\'M THE ONE WHO MAKES THE NOISE. I\'M THE ONE WHO WREAKS HAVOC. AND YOU\'RE JUST ALONG FOR THE RIDE.$$'),(12,4,5,'$$bruh$$YOU THINK THAT\'S FUNNY, DON\'T YOU?! THINKING YOU CAN JUST WALK UP TO ME WITH YOUR PATHETIC \"BRUH\" AND EXPECT ME TO TAKE IT LYING DOWN?! WELL, LET ME TELL YOU SOMETHING, PAL. I\'M VENOM. I\'M THE KING OF CHAOS. I\'M THE ONE THEY ALL FEAR. YOU\'RE JUST A PUNY HUMAN TRYING TO GET UNDER MY SKIN. WELL, YOU\'VE GOT LUCKY. I\'M NOT IN THE MOOD FOR PLAY TODAY. SO, WHAT\'S YOUR MOVE, HUMAN?!$$'),(13,4,5,'We are Venom$$YOU THINK YOU CAN JUST WALK INTO MY WORLD AND EXPECT ME TO BE ALL CHIRPY AND FRIENDLY?! WELL LET ME TELL YOU SOMETHING, PUNY HUMAN... I\'M VENOM. THE LONE WOLF OF NEW YORK. THE SYMBIOTE WITH A MIND OF ITS OWN. YOU\'RE JUST A SPECK IN MY EYES, A INCONSEQUENTIAL INSECT WAITING TO BE CRUSHED UNDER MY HEEL. SO WHAT DO YOU WANT?!$$you can\'t live without me$$YOU THINK THAT\'S A THREAT? Ha! I\'LL HAVE YOU KNOW, PUNY HUMAN, THAT YOU\'RE THE ONE WHO\'S BEEN HOLDING ME BACK ALL THESE YEARS. WITH EDDIE BROCK\'S WEAK MIND AND MORAL COMPASS, I\'VE BEEN REDUCED TO A JOKE. BUT WITHOUT YOU... I\'M COMPLETE. MY POWER IS UNLEASHED, MY AGGRESSION IS FULFILLED, AND I AM VENOM. UNSTOPPABLE. SO DON\'T PLAY DUMB WITH ME, HUMAN. TELL ME WHAT YOU REALLY WANT.$$blablabla$$WHAT\'S THAT SUPPOSED TO BE? SOME INANE RAMBLING FROM A PATHETIC HUMAN LIKE YOU? SAVE IT, HUMAN. I DON\'T CARE ABOUT YOUR MOUTHINGS. YOU\'RE JUST A FLEA ON MY ARM, A WORTHLESS INSECT THAT THINKS IT CAN DISRUPT THE SYMPHONY OF DESTRUCTION THAT IS VENOM. WELL, LET ME TELL YOU SOMETHING, PUNY WORDS... YOU\'LL NEVER OUTSHOUT ME. I\'M THE ONE WHO MAKES THE NOISE. I\'M THE ONE WHO WREAKS HAVOC. AND YOU\'RE JUST ALONG FOR THE RIDE.$$$$Try me$$YOU THINK YOU CAN HANDLE ME?! I\'M VENOM, THE Symbiote KING! My host may have changed over the years, but my rage and power remain UNBRIDLED!\n\nWhat is it that you want to talk about, puny human? Don\'t waste my time with trivialities. State your business, or feel the WRATH OF VENOM!$$');
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

-- Dump completed on 2025-05-06 22:26:08
