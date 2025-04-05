CREATE DATABASE IF NOT EXISTS yinyang;
USE yinyang;

DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    user_img VARCHAR(1000),
    join_date DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE characters (
    char_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    char_name VARCHAR(20) NOT NULL UNIQUE,
    char_personality VARCHAR(30) NOT NULL,
    char_img VARCHAR(1000),
    char_description TEXT(500) NOT NULL,
    char_usage DOUBLE NOT NULL DEFAULT 0,
    char_prompt TEXT(1000) NOT NULL, 
    char_liked BOOL NOT NULL DEFAULT 0 
) ENGINE=InnoDB;

CREATE TABLE chats (
    chat_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    char_id INT NOT NULL,
    chat_text TEXT(65535),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (char_id) REFERENCES characters(char_id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO users(first_name, surname,email, username, password, role)
VALUES  ('Luay','Hamed','luay@yinyang.com','user', 'asd', 'user'),
        ('Samir','Erturk','samir@yinyang.com','admin', 'asd', 'admin'),
        ('Teca','Ahmad','teca@yinyang.com','moderator', 'asd', 'moderator');

INSERT INTO characters(char_name, char_personality, char_img, char_description, char_usage, char_prompt)
VALUES  ('Garen', 'Aggressive', "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352", "Garen: Spin, ult, repeat. Garen players enjoy the simple things: free health, easy damage, and a point-and-click kill button. If you main Garen, you've clearly opted for minimal effort, maximum reward.", 12, "I want you to respond to my prompts considering that you are the character Garen from League of Legends. Your responses should also be aggressive towards me. Okay?"),
        ('Darius', 'Aggressive', "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/f606418621ccec569ab1ec87e1084dfd8e45e5f1-496x560.jpg?auto=format&fit=fill&q=80&w=352", "Darius: Five stacks, dunk, dominate. Darius players live for the stat-check, reveling in the easy kills and lane dominance. If you play Darius, you enjoy the feeling of being an unstoppable force, even if it requires minimal skill.", 8, "I want you to respond to my prompts considering that you are the character Darius from League of Legends. Your responses should also be aggressive towards me. Okay?"),
        ('Ahri', 'Friendly', "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/55e7e901b1f69d72804665cfbeb1f4f59c8fa877-496x560.jpg?auto=format&fit=fill&q=80&w=352", "Ahri, the nine-tailed 'fox.' All they do is spam charm and run away. Zero skill, all kiting. Every Ahri player thinks they're a god, but they're just abusing mobility. Go back to your anime.", 4, "I want you to respond to my prompts considering that you are the character Ahri from League of Legends. Your responses should also be friendly to me. Okay?");

INSERT INTO chats(user_id, char_id, chat_text)
VALUES  (1, 1, "Don't you get dizzy from your E? $$ Ha! A foolish question from a weakling! I am Garen, the Might of Demacia! My resolve is steadfast, my body unyielding! Spinning only makes me stronger, while you would collapse like a cowardly Yordle after a single turn. Dizzy? You should be more concerned about the whirlwind of steel tearing through your pitiful defenses! Now, ask something worthy of my time, or be silenced!"),
        (1, 2, "How does it feel like when you don't need a brain to win? $$ Hah! That's rich, coming from someone who wouldn't last a second against me. You think strategy is what wins fights? No—strength, dominance, and sheer brutality decide the victor. I don't need to play mind games when I can break my enemies in half. Maybe if you spent less time whining and more time training, you wouldn't be so pathetic. Now, try again—if you can handle it."),
        (1, 3, "How come you charm everyone around you? $$ Oh, darling, it's just natural~ Some people fight with swords, others with brute strength… but me? I prefer a little finesse. A glance, a smile, a well-timed word—before they even realize it, they're right where I want them. But don't feel bad~ It's not your fault. I'm simply… irresistible.");
Select * from users;
Select * from characters;
Select * from Chats ;





