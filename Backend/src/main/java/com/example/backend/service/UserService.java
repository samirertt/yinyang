package com.example.backend.service;


import com.example.backend.dto.CharacterFilter;
import com.example.backend.models.Character;
import com.example.backend.repository.CharacterRepository;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.backend.models.User;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CharacterRepository characterRepository;

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> getUserById(Long userId){
        return userRepository.findById(userId);
    }

    public List<Character> getAllCharacters() {
        return characterRepository.findAll();
    }

    public List<CharacterFilter> getCharacterPersonalities() {
        return characterRepository.findDistinctPersonalities();
    }

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public User validateUser(String identifier, String rawPassword) {
        Optional<User> userModel;

        if (identifier.contains("@")) {
            userModel = userRepository.findByEmail(identifier);
        } else {
            userModel = userRepository.findByUsername(identifier);
        }

        if (userModel.isPresent()) {
            User user = userModel.get();
//REMOVE THE NEXT IF STATEMENT BEFORE PRESENTATION
            if (passwordEncoder.matches(rawPassword, passwordEncoder.encode(user.getPassword()))) {
                return user;
            }
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return user;
            }
        }

        return null;
    }

    public User toggleUserRole(int userId) {
        User user = userRepository.findById((long) userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roles = user.getRoles();
        if (roles.contains("user")) {
            roles.remove("user");
            roles.add("moderator");
        } else if (roles.contains("moderator")) {
            roles.remove("moderator");
            roles.add("user");
        }

        return userRepository.save(user);
    }

    public List<Character> getCharacterByPersonality(String personality) {
        return characterRepository.findByCharPersonality(personality);
    }

    public List<Character> searchCharactersByName(String name) {
        return characterRepository.findByCharNameContainingIgnoreCase(name);
    }

    public Optional<Character> searchCharactersById(Integer Id) {
        return characterRepository.findById(Id);
    }

    public String getProfileImage(String username) {
        // Fetch the user from the database using the username
        Optional<User> userOptional = userRepository.findByUsername(username);

        return userOptional
                .filter(user -> user.getUserImg() != null)
                .map(User::getUserImg)
                .orElse(null);
    }

    public boolean updateProfileImage(String imageUrl, String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();  // Get the User object

            user.setUserImg(imageUrl);  // Set the profile image URL
            userRepository.save(user);  // Save the updated user to the database

            return true;
        }

        // If no user is found with the given username, return false
        return false;
    }


    public void incrementCharacterUsage(String characterName) {
        Character character = characterRepository.findByCharName(characterName)
                .orElseThrow(() -> new RuntimeException("Character not found"));

        character.setCharUsage(character.getCharUsage() + 1);
        characterRepository.save(character);

    }

    public ResponseEntity<?> updateUserField(String username, String newValue, String fieldName) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            switch (fieldName) {
                case "firstName" -> user.setFirstName(newValue);
                case "surname" -> user.setSurname(newValue);
                case "username" -> user.setUsername(newValue);
                case "email" -> user.setEmail(newValue);
                case "password" -> user.setPassword(newValue);
                default -> throw new IllegalArgumentException("Invalid field name");
            }

            userRepository.save(user);
            return ResponseEntity.ok().body(fieldName + " updated");
        } else {
            throw new NullPointerException("User not found");
        }
    }


}



